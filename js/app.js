/**
 * Lógica principal de la aplicación UI y Eventos
 * Requiere que prompts.js esté cargado antes.
 */

document.addEventListener('DOMContentLoaded', () => {
    const selectCategoria = document.getElementById('categoriaSelect');
    const dynamicFieldsContainer = document.getElementById('dynamicFieldsContainer');
    const formSection = document.getElementById('formSection');
    const placeholderBox = document.getElementById('placeholderBox');
    const actionButtonsArea = document.getElementById('actionButtonsArea');
    const btnGenerar = document.getElementById('btnGenerar');
    const btnDescargarPDF = document.getElementById('btnDescargarPDF');
    const resultBox = document.getElementById('promptResult');
    const btnCopiar = document.getElementById('btnCopiar');

    // 1. DIBUJAR LOS FORMULARIOS ESPECÍFICOS CON ICONOS DINÁMICAMENTE
    selectCategoria.addEventListener('change', function() {
        const cat = this.value;
        
        if (cat === 'all' || cat === '') {
            formSection.classList.add('d-none');
            placeholderBox.classList.remove('d-none');
            actionButtonsArea.classList.add('d-none');
            resultBox.value = "El prompt estructurado y profesional aparecerá aquí, listo para ser copiado a tu IA favorita...";
            return;
        }

        const config = PROMPT_CONFIG[cat];
        if (!config) return;

        formSection.classList.remove('d-none');
        placeholderBox.classList.add('d-none');
        actionButtonsArea.classList.remove('d-none');
        
        let html = '';
        config.campos.forEach(campo => {
            const inputType = campo.type || 'text';
            html += `
                <div class="mb-3">
                    <label class="form-label" for="${campo.id}">
                        <i class="fa-solid ${campo.icon}"></i> ${campo.label}
                    </label>
                    <input type="${inputType}" id="${campo.id}" class="form-control-custom" placeholder="${campo.placeholder}">
                </div>
            `;
        });
        
        dynamicFieldsContainer.innerHTML = html;
        
        // Reset the result box
        resultBox.value = `Completa los datos de "${config.titulo}" y presiona Generar.`;
    });

    // 2. CONSTRUIR EL PROMPT ESTRICTO (NIVEL PRO)
    btnGenerar.addEventListener('click', function() {
        const cat = selectCategoria.value;
        const config = PROMPT_CONFIG[cat];
        if (!config) return;

        let todosLlenos = true;
        const datos = {};
        
        config.campos.forEach(campo => {
            const el = document.getElementById(campo.id);
            const val = el ? el.value.trim() : '';
            if(!val) todosLlenos = false;
            datos[campo.id] = val || `[Falta: ${campo.label}]`;
        });

        if(!todosLlenos) {
            // Optional: Show warning visually
            resultBox.value = "⚠️ Advertencia: Es mejor llenar todos los campos para que la IA no invente información.\n\nGenerando prompt con datos faltantes...";
        }

        const promptFinal = config.ensamblar(datos);

        // Animación suave del resultado
        resultBox.style.opacity = '0';
        setTimeout(() => {
            resultBox.value = promptFinal;
            resultBox.style.opacity = '1';
            resultBox.style.transition = 'opacity 0.4s ease';
        }, 150);
    });

    // 3. BOTÓN DE COPIAR CON FEEDBACK
    btnCopiar.addEventListener('click', function() {
        const textToCopy = resultBox.value;
        if(textToCopy.includes("aparecerá aquí") || textToCopy.includes("Completa los datos")) {
            return; // No copiar placeholders
        }

        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fa-solid fa-check me-2"></i>¡PROMPT COPIADO AL PORTAPAPELES!';
            this.classList.replace('btn-secondary-custom', 'btn-success-custom');
            
            setTimeout(() => { 
                this.innerHTML = originalText;
                this.classList.replace('btn-success-custom', 'btn-secondary-custom');
            }, 2500);
        }).catch(err => {
            console.error('Error al copiar: ', err);
            alert("Hubo un error al copiar el texto.");
        });
    });

    // 4. BOTÓN DE PDF (MANUAL)
    btnDescargarPDF.addEventListener('click', function() {
        const selector = selectCategoria.value;
        const elementoOrigen = document.getElementById('documento-pdf');
        
        // Ensure PDF is displayed before generation
        const elementoClonado = elementoOrigen.cloneNode(true);
        elementoClonado.style.display = 'block';
        elementoClonado.style.visibility = 'visible';
        
        // Mapear categorías a bloques del manual
        const mapaCategorias = {
            'tema': 'doc-planificacion', 'pdc': 'doc-planificacion', 'evaluacion': 'doc-planificacion', 'rubricas': 'doc-planificacion', 'adaptacion': 'doc-planificacion', 'tutoria': 'doc-planificacion', 'proyecto_abp': 'doc-planificacion', 'dinamicas': 'doc-planificacion',
            'word': 'doc-ofimatica', 'excel': 'doc-ofimatica', 'pptx': 'doc-ofimatica', 'admin': 'doc-ofimatica', 'correo': 'doc-ofimatica',
            'taller': 'doc-codigo', 'frontend': 'doc-codigo', 'backend': 'doc-codigo', 'tutor_codigo': 'doc-codigo', 'debugging': 'doc-codigo', 'arquitectura': 'doc-codigo', 'sql': 'doc-codigo',
            'video': 'doc-multimedia', 'audio': 'doc-multimedia', 'imagen': 'doc-multimedia', 'copywriting': 'doc-multimedia'
        };

        let nombreArchivo = 'Manual_Prompts_EduConnect_Pro.pdf';

        if (selector !== 'all' && mapaCategorias[selector]) {
            const bloqueActivo = mapaCategorias[selector];
            const textOption = selectCategoria.options[selectCategoria.selectedIndex].text.trim();
            // Limpiar emojis y caracteres raros
            const cleanText = textOption.replace(/[^\w\s-]/gi, '').trim().replace(/\s+/g, '_');
            nombreArchivo = `Manual_${cleanText}.pdf`;
            
            // Remover saltos de página forzados
            if(elementoClonado.querySelector(`#${bloqueActivo}`)) {
                elementoClonado.querySelector(`#${bloqueActivo}`).classList.remove('pdf-page-break');
            }

            // Ocultar otras secciones no relacionadas
            const todosLosBloques = ['doc-planificacion', 'doc-ofimatica', 'doc-multimedia', 'doc-codigo'];
            todosLosBloques.forEach(id => {
                if (id !== bloqueActivo) {
                    const nodo = elementoClonado.querySelector(`#${id}`);
                    if (nodo) nodo.remove();
                }
            });
        }

        const opciones = {
            margin:       [15, 15, 15, 15],
            filename:     nombreArchivo,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, letterRendering: true, backgroundColor: '#ffffff' },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Cambiar el estilo de los botones para mostrar carga
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Generando PDF...';
        this.disabled = true;

        html2pdf().set(opciones).from(elementoClonado).save().then(() => {
            this.innerHTML = originalHTML;
            this.disabled = false;
        }).catch(err => {
            console.error("Error generating PDF:", err);
            this.innerHTML = '<i class="fa-solid fa-triangle-exclamation me-2"></i> Error al generar PDF';
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.disabled = false;
            }, 3000);
        });
    });
});
