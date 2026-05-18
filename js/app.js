/**
 * Lógica principal UI - Sistema de dos pasos (Grupo → Herramienta)
 * Requiere prompts.js cargado antes.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias DOM
    const gruposContainer      = document.getElementById('grupos-container');
    const paso2Section         = document.getElementById('paso2-section');
    const herramientaSelect    = document.getElementById('herramientaSelect');
    const dynamicFieldsContainer = document.getElementById('dynamicFieldsContainer');
    const formSection          = document.getElementById('formSection');
    const placeholderBox       = document.getElementById('placeholderBox');
    const actionButtonsArea    = document.getElementById('actionButtonsArea');
    const btnGenerar           = document.getElementById('btnGenerar');
    const btnDescargarPDF      = document.getElementById('btnDescargarPDF');
    const resultBox            = document.getElementById('promptResult');
    const btnCopiar            = document.getElementById('btnCopiar');

    let grupoActivo = null;

    // =====================================================
    // PASO 1: Renderizar tarjetas de grupos
    // =====================================================
    function renderGrupos() {
        gruposContainer.innerHTML = '';
        Object.entries(GRUPOS).forEach(([key, grupo]) => {
            const btn = document.createElement('button');
            btn.className = 'grupo-btn';
            btn.dataset.grupo = key;
            btn.innerHTML = `<i class="fa-solid ${grupo.icon}"></i><span>${grupo.label}</span>`;
            btn.addEventListener('click', () => seleccionarGrupo(key, btn));
            gruposContainer.appendChild(btn);
        });
    }

    // =====================================================
    // PASO 2: Al seleccionar un grupo
    // =====================================================
    function seleccionarGrupo(grupoKey, btnEl) {
        // Marcar botón activo
        document.querySelectorAll('.grupo-btn').forEach(b => b.classList.remove('activo'));
        btnEl.classList.add('activo');
        grupoActivo = grupoKey;

        // Rellenar select de herramientas
        const grupo = GRUPOS[grupoKey];
        herramientaSelect.innerHTML = '<option value="">-- Selecciona una herramienta --</option>';
        grupo.herramientas.forEach(key => {
            const config = PROMPT_CONFIG[key];
            if (!config) return;
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = config.titulo;
            herramientaSelect.appendChild(opt);
        });

        // Mostrar paso 2, ocultar formulario y resultado anterior
        paso2Section.classList.remove('d-none');
        formSection.classList.add('d-none');
        actionButtonsArea.classList.add('d-none');
        placeholderBox.classList.remove('d-none');
        placeholderBox.querySelector('p').innerHTML = `Ahora elige una herramienta de <strong>${grupo.label}</strong>.`;
        dynamicFieldsContainer.innerHTML = '';
        resultBox.value = 'El prompt estructurado y profesional aparecerá aquí, listo para ser copiado a tu IA favorita...';
    }

    // =====================================================
    // PASO 3: Al seleccionar herramienta → mostrar form
    // =====================================================
    herramientaSelect.addEventListener('change', function () {
        const cat = this.value;
        if (!cat) {
            formSection.classList.add('d-none');
            actionButtonsArea.classList.add('d-none');
            placeholderBox.classList.remove('d-none');
            return;
        }

        const config = PROMPT_CONFIG[cat];
        if (!config) return;

        placeholderBox.classList.add('d-none');
        formSection.classList.remove('d-none');
        actionButtonsArea.classList.remove('d-none');

        // Construir campos dinámicos
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
        resultBox.value = `Completa los datos de "${config.titulo}" y presiona Generar.`;
    });

    // =====================================================
    // GENERAR PROMPT (Nivel PRO con candados)
    // =====================================================
    btnGenerar.addEventListener('click', function () {
        const cat = herramientaSelect.value;
        const config = PROMPT_CONFIG[cat];
        if (!config) return;

        let todosLlenos = true;
        const datos = {};

        config.campos.forEach(campo => {
            const el = document.getElementById(campo.id);
            const val = el ? el.value.trim() : '';
            if (!val) todosLlenos = false;
            datos[campo.id] = val || `[Falta: ${campo.label}]`;
        });

        const promptFinal = config.ensamblar(datos);

        // Feedback visual si campos vacíos
        if (!todosLlenos) {
            resultBox.style.borderColor = '#f59e0b';
            setTimeout(() => { resultBox.style.borderColor = ''; }, 2000);
        }

        // Animación fade-in del resultado
        resultBox.style.opacity = '0';
        setTimeout(() => {
            resultBox.value = promptFinal;
            resultBox.style.transition = 'opacity 0.4s ease';
            resultBox.style.opacity = '1';
        }, 150);
    });

    // =====================================================
    // COPIAR AL PORTAPAPELES
    // =====================================================
    btnCopiar.addEventListener('click', function () {
        const textToCopy = resultBox.value;
        const placeholders = ['aparecerá aquí', 'Completa los datos', 'listo para ser copiado'];
        if (placeholders.some(p => textToCopy.includes(p))) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fa-solid fa-check me-2"></i>¡COPIADO AL PORTAPAPELES!';
            this.classList.replace('btn-secondary-custom', 'btn-success-custom');
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.classList.replace('btn-success-custom', 'btn-secondary-custom');
            }, 2500);
        }).catch(() => alert('Error al copiar. Selecciona el texto manualmente.'));
    });

    // =====================================================
    // DESCARGAR MANUAL PDF
    // =====================================================
    btnDescargarPDF.addEventListener('click', function () {
        const cat = herramientaSelect.value;
        const elementoOrigen = document.getElementById('documento-pdf');
        const elementoClonado = elementoOrigen.cloneNode(true);
        elementoClonado.style.cssText = 'display:block;visibility:visible;position:relative;left:0;top:0;';

        const mapaCategorias = {
            'tema': 'doc-planificacion', 'pdc': 'doc-planificacion', 'evaluacion': 'doc-planificacion',
            'rubricas': 'doc-planificacion', 'adaptacion': 'doc-planificacion', 'tutoria': 'doc-planificacion',
            'proyecto_abp': 'doc-planificacion', 'dinamicas': 'doc-planificacion',
            'word': 'doc-ofimatica', 'excel': 'doc-ofimatica', 'pptx': 'doc-ofimatica',
            'admin': 'doc-ofimatica', 'correo': 'doc-ofimatica',
            'plataforma_educativa': 'doc-codigo', 'taller': 'doc-codigo', 'frontend': 'doc-codigo',
            'backend': 'doc-codigo', 'tutor_codigo': 'doc-codigo', 'debugging': 'doc-codigo',
            'arquitectura': 'doc-codigo', 'sql': 'doc-codigo',
            'video': 'doc-multimedia', 'audio': 'doc-multimedia', 'imagen': 'doc-multimedia',
            'copywriting': 'doc-multimedia'
        };

        let nombreArchivo = 'Manual_Prompts_PRO_EduConnect.pdf';

        if (cat && mapaCategorias[cat]) {
            const bloqueActivo = mapaCategorias[cat];
            const textOption = herramientaSelect.options[herramientaSelect.selectedIndex]?.text?.trim() || '';
            const cleanText = textOption.replace(/[^\w\s-]/gi, '').trim().replace(/\s+/g, '_').substring(0, 40);
            nombreArchivo = `Manual_${cleanText || 'Prompts_PRO'}.pdf`;

            const nodoActivo = elementoClonado.querySelector(`#${bloqueActivo}`);
            if (nodoActivo) nodoActivo.classList.remove('pdf-page-break');

            ['doc-planificacion', 'doc-ofimatica', 'doc-multimedia', 'doc-codigo'].forEach(id => {
                if (id !== bloqueActivo) {
                    const nodo = elementoClonado.querySelector(`#${id}`);
                    if (nodo) nodo.remove();
                }
            });
        }

        const opciones = {
            margin:      [10, 10, 10, 10],   // 10mm márgenes en A4
            filename:    nombreArchivo,
            image:       { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale:           2,
                useCORS:         true,
                letterRendering: true,
                backgroundColor: '#ffffff',
                windowWidth:     680,    // Debe coincidir con el ancho CSS del #documento-pdf
                scrollX:         0,
                scrollY:         0
            },
            jsPDF: {
                unit:        'mm',
                format:      'a4',
                orientation: 'portrait'
            }
        };

        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generando PDF...';
        this.disabled = true;

        html2pdf().set(opciones).from(elementoClonado).save()
            .then(() => {
                this.innerHTML = originalHTML;
                this.disabled = false;
            })
            .catch(err => {
                console.error('Error PDF:', err);
                this.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error';
                setTimeout(() => { this.innerHTML = originalHTML; this.disabled = false; }, 3000);
            });
    });

    // Inicializar grupos
    renderGrupos();
});
