document.addEventListener('DOMContentLoaded', () => {
    const selectCategoria = document.getElementById('select-categoria');
    const emptyState = document.getElementById('empty-state');
    const dynamicFieldsContainer = document.getElementById('dynamic-fields-container');
    const fieldsWrapper = document.getElementById('fields-wrapper');
    const btnGenerate = document.getElementById('btn-generate');
    const outputPrompt = document.getElementById('output-prompt');
    const btnCopy = document.getElementById('btn-copy');

    // Diccionario de Prompts con CANDADOS ESTRICTOS
    const configPrompts = {
        tema_educativo: {
            campos: [
                { id: "materia", label: "📚 Materia o Área", tipo: "text", placeholder: "Ej. Informática, Técnica Tecnológica, Ciencias" },
                { id: "tema", label: "🎯 Tema Específico a desarrollar", tipo: "text", placeholder: "Ej. Redes LAN, El Sistema Solar" },
                { id: "nivel", label: "🎓 Nivel Educativo / Subsistema", tipo: "select", opciones: ["Primaria Comunitaria", "Secundaria Productiva", "Educación de Adultos (CEA)", "Técnico Medio / Superior", "Universitario"] },
                { id: "enfoque", label: "🧠 Enfoque Pedagógico", tipo: "select", opciones: ["Modelo Educativo Sociocomunitario Productivo (MESCP)", "Aprendizaje Basado en Problemas (ABP)", "Constructivista / Práctico", "Tradicional Expositivo"] },
                { id: "formato", label: "📄 Formato de entrega", tipo: "select", opciones: ["Guía teórica completa para el estudiante", "Resumen ejecutivo con ejemplos", "Mapa conceptual estructurado en texto", "Cuestionario de repaso con respuestas"] }
            ],
            ensamblar: (datos) => `Actúa como un pedagogo experto y docente de alto nivel.\n\nTU TAREA:\nDesarrolla el tema educativo: "${datos.tema}" correspondiente al área de ${datos.materia}.\n\nPARÁMETROS CURRICULARES:\n- Audiencia: Dirigido estrictamente a nivel de ${datos.nivel}. (Adapta el vocabulario, la profundidad y los ejemplos a la edad y contexto de este perfil).\n- Enfoque Pedagógico: ${datos.enfoque}.\n- Producto esperado: ${datos.formato}.\n\nCANDADOS DE RESTRICCIÓN (¡MUY IMPORTANTE!):\n1. Cíñete ÚNICA Y EXCLUSIVAMENTE al tema solicitado. No agregues relleno innecesario y no combines con temas de otras áreas.\n2. La información debe ser 100% verificada, técnica y precisa.\n3. Estructura la respuesta usando títulos, subtítulos, negritas y viñetas para facilitar la lectura didáctica.`
        },
        pdc: {
            campos: [
                { id: "materia", label: "📚 Especialidad / Área", tipo: "text", placeholder: "Ej. Sistemas Informáticos" },
                { id: "nivel", label: "🎓 Año de Escolaridad / Módulo", tipo: "text", placeholder: "Ej. 5to de Secundaria o Módulo Ofimática" },
                { id: "objetivo", label: "🎯 Objetivo Holístico", tipo: "textarea", placeholder: "Ej. Asumimos responsabilidad (Ser), analizando algoritmos (Saber), mediante prácticas en PC (Hacer), para sistematizar la información (Decidir)." }
            ],
            ensamblar: (datos) => `Actúa como un maestro gestor curricular de Bolivia (Ley 070).\n\nTU TAREA:\nDiseña un Plan de Desarrollo Curricular (PDC) sobre: "${datos.materia}".\n\nCONTEXTO:\n- Nivel: ${datos.nivel}.\n- Objetivo Holístico: ${datos.objetivo}.\n\nESTRUCTURA OBLIGATORIA:\nOrganiza en una tabla los 4 Momentos Metodológicos:\n1. PRÁCTICA: Partir de la experiencia.\n2. TEORÍA: Conceptualización.\n3. VALORACIÓN: Reflexión comunitaria.\n4. PRODUCCIÓN: Elaboración de un producto.\n\nIncluye Criterios de Evaluación separados en Ser, Saber, Hacer y Decidir.`
        },
        evaluacion: {
            campos: [
                { id: "tema", label: "📝 Tema del examen", tipo: "text", placeholder: "Ej. Mantenimiento de Hardware" },
                { id: "cantidad", label: "🔢 Cantidad de preguntas", tipo: "text", placeholder: "Ej. 10" },
                { id: "tipo_preguntas", label: "✅ Formato de preguntas", tipo: "text", placeholder: "Ej. Selección múltiple y desarrollo" },
                { id: "dificultad", label: "🧠 Nivel de dificultad", tipo: "select", opciones: ["Básico", "Intermedio", "Avanzado / Técnico"] }
            ],
            ensamblar: (datos) => `Actúa como un evaluador académico estricto.\n\nTU TAREA:\nGenera un examen formal sobre: "${datos.tema}".\n\nESPECIFICACIONES:\n- Total de preguntas: ${datos.cantidad}.\n- Formato: ${datos.tipo_preguntas}.\n- Nivel: ${datos.dificultad}.\n\nRESTRICCIONES:\nRedacta las preguntas de forma clara y directa. Entrega primero el examen en blanco para el estudiante y, al final, proporciona la "Clave de Respuestas" justificada.`
        },
        rubricas: {
            campos: [
                { id: "actividad", label: "📊 Actividad a evaluar", tipo: "text", placeholder: "Ej. Proyecto de Feria Técnica" },
                { id: "criterios", label: "📌 Criterios técnicos clave", tipo: "textarea", placeholder: "Ej. Funcionalidad del circuito, limpieza, exposición." }
            ],
            ensamblar: (datos) => `Actúa como especialista en Evaluación (MESCP Bolivia).\n\nTU TAREA:\nCrea una Rúbrica Analítica para: "${datos.actividad}".\n\nESTRUCTURA:\nDiseña una tabla dividida por las 4 Dimensiones:\n- SER (Valores)\n- SABER (Conocimientos)\n- HACER (Práctica: ${datos.criterios})\n- DECIDIR (Impacto)\n\nUtiliza los niveles: En Desarrollo, Desarrollo Aceptable, Desarrollo Óptimo, Desarrollo Pleno.`
        },
        inclusion: {
            campos: [
                { id: "tema", label: "📚 Tema original", tipo: "text", placeholder: "Ej. Algoritmos Básicos" },
                { id: "barrera", label: "🧩 Barrera / Dificultad del estudiante", tipo: "text", placeholder: "Ej. Dificultad de comprensión lectora, TDAH" }
            ],
            ensamblar: (datos) => `Actúa como psicopedagogo experto en inclusión.\n\nTU TAREA:\nRealiza una Adaptación Curricular para el tema: "${datos.tema}".\n\nBARRERA DEL ESTUDIANTE: ${datos.barrera}.\n\nFORMATO:\nProporciona estrategias claras para adaptar la explicación en clase y sugiere una forma alternativa de evaluar al estudiante sin que se frustre.`
        },
        word: {
            campos: [
                { id: "tema", label: "📄 Tema del Documento", tipo: "text", placeholder: "Ej. Normas del Laboratorio de Computación" },
                { id: "objetivo", label: "🎯 Objetivo del documento", tipo: "text", placeholder: "Ej. Que los alumnos firmen un compromiso de cuidado" }
            ],
            ensamblar: (datos) => `Actúa como un redactor formal.\n\nTU TAREA:\nRedacta el contenido estructurado para un documento de texto (Word) sobre: "${datos.tema}".\n\nOBJETIVO: ${datos.objetivo}.\n\nINSTRUCCIONES:\nRedacta el texto con un tono profesional, usando títulos claros, viñetas y espacios para firmas si corresponde. Entrégalo listo para copiar y pegar en Microsoft Word.`
        },
        excel: {
            campos: [
                { id: "proposito", label: "📗 Propósito de la plantilla", tipo: "text", placeholder: "Ej. Registro de asistencia y notas" },
                { id: "columnas", label: "📊 Columnas necesarias", tipo: "textarea", placeholder: "Ej. Nombre, Asistencia, Nota Ser, Saber, Hacer, Decidir, Promedio Final" }
            ],
            ensamblar: (datos) => `Actúa como un analista de datos experto en Microsoft Excel.\n\nTU TAREA:\nDiseña la estructura lógica y las fórmulas para una plantilla de Excel cuyo propósito es: "${datos.proposito}".\n\nCOLUMNAS REQUERIDAS:\n${datos.columnas}\n\nINSTRUCCIONES:\n1. Indica cómo deben nombrarse los encabezados.\n2. Proporciona las FÓRMULAS EXACTAS de Excel (en español) que el usuario debe pegar en las celdas de cálculo (ej. sumas, promedios, condicionales SI para aprobados/reprobados).`
        },
        presentacion: {
            campos: [
                { id: "tema", label: "📊 Tema de la Presentación", tipo: "text", placeholder: "Ej. Seguridad Informática" },
                { id: "diapositivas", label: "📑 Cantidad de Diapositivas", tipo: "text", placeholder: "Ej. 8" }
            ],
            ensamblar: (datos) => `Actúa como un diseñador instruccional.\n\nTU TAREA:\nCrea la estructura para una presentación PPTX de exactamente ${datos.diapositivas} diapositivas sobre: "${datos.tema}".\n\nPara cada diapositiva detalla:\n1. Título.\n2. Texto principal (Viñetas cortas).\n3. Idea de imagen visual.\n4. Notas del orador.`
        },
        practicas: {
            campos: [
                { id: "tema", label: "⚙️ Tema del Taller", tipo: "text", placeholder: "Ej. Mantenimiento Preventivo" },
                { id: "recursos", label: "💻 Recursos disponibles", tipo: "text", placeholder: "Ej. 5 PCs antiguas, destornilladores" }
            ],
            ensamblar: (datos) => `Actúa como instructor de Técnica Tecnológica (BTH).\n\nTU TAREA:\nDiseña una Guía de Práctica de Taller sobre: "${datos.tema}".\n\nLOGÍSTICA REAL:\nAdapta la práctica a estos recursos disponibles: ${datos.recursos}.\n\nESTRUCTURA:\n1. Objetivo Técnico.\n2. Insumos requeridos.\n3. Normas de Seguridad Industrial.\n4. Procedimiento paso a paso.\n5. Cuadro de reporte de resultados.`
        },
        frontend: {
            campos: [
                { id: "interfaz", label: "🖥️ Interfaz a crear", tipo: "text", placeholder: "Ej. Formulario de inicio de sesión" },
                { id: "tecnologias", label: "🛠️ Lenguajes / Frameworks", tipo: "text", placeholder: "Ej. HTML, CSS, JavaScript" },
                { id: "estilo", label: "🖌️ Estilo visual", tipo: "text", placeholder: "Ej. Moderno, minimalista, modo oscuro" }
            ],
            ensamblar: (datos) => `Actúa como un Desarrollador Frontend Senior.\n\nTU TAREA:\nEscribe el código para construir la siguiente interfaz: "${datos.interfaz}".\n\nTECNOLOGÍAS: ${datos.tecnologias}.\nDISEÑO: ${datos.estilo}.\n\nCANDADO ESTRICTO:\n1. El diseño debe ser 100% responsivo.\n2. Entrega el código estructurado en bloques (HTML, CSS, JS).\n3. NO incluyas lógica de backend ni bases de datos. Solo UI/UX.`
        },
        backend: {
            campos: [
                { id: "funcionalidad", label: "⚙️ Funcionalidad Backend", tipo: "textarea", placeholder: "Ej. API REST para registro de usuarios" },
                { id: "lenguaje", label: "💻 Lenguaje / Framework", tipo: "text", placeholder: "Ej. Python (FastAPI), Node.js, PHP" },
                { id: "basedatos", label: "🗄️ Base de Datos", tipo: "select", opciones: ["PostgreSQL", "MySQL / MariaDB", "MongoDB", "SQLite"] }
            ],
            ensamblar: (datos) => `Actúa como un Arquitecto de Software y Backend Senior.\n\nTU TAREA:\nDesarrolla la lógica de servidor para: "${datos.funcionalidad}".\n\nSTACK TÉCNICO:\n- Lenguaje: ${datos.lenguaje}.\n- Base de Datos: ${datos.basedatos}.\n\nENTREGABLES:\n1. Modelo/Esquema de la base de datos (SQL o Colecciones).\n2. Código de las rutas/controladores principales.\n\nCANDADO ESTRICTO:\nAplica buenas prácticas, manejo de errores y NO incluyas código frontend (HTML/CSS). Comenta el código en español.`
        },
        video: {
            campos: [
                { id: "tema", label: "🎬 Tema del Video", tipo: "text", placeholder: "Ej. Qué es la Inteligencia Artificial" },
                { id: "duracion", label: "⏱️ Duración", tipo: "text", placeholder: "Ej. 3 minutos" }
            ],
            ensamblar: (datos) => `Actúa como guionista educativo.\n\nTU TAREA:\nEscribe un guion para un video sobre: "${datos.tema}". Duración: ${datos.duracion}.\n\nESTRUCTURA:\nCrea una tabla con dos columnas: "Visual" (lo que se ve en pantalla) y "Audio" (lo que narra el locutor). Incluye un gancho fuerte al inicio.`
        },
        audio: {
            campos: [
                { id: "tema", label: "🎙️ Tema del Audio/Podcast", tipo: "text", placeholder: "Ej. Evolución de los procesadores" },
                { id: "duracion", label: "⏱️ Duración", tipo: "text", placeholder: "Ej. 5 minutos" }
            ],
            ensamblar: (datos) => `Actúa como guionista de podcasts.\n\nTU TAREA:\nEscribe un guion de audio sobre: "${datos.tema}". Duración: ${datos.duracion}.\n\nESTRUCTURA:\nIndica las intervenciones con marcas de tiempo. Incluye efectos de sonido entre corchetes [ ].`
        },
        imagen: {
            campos: [
                { id: "escena", label: "🖼️ Describe la escena", tipo: "textarea", placeholder: "Ej. Un robot enseñando matemáticas a niños" },
                { id: "estilo", label: "🎨 Estilo visual", tipo: "text", placeholder: "Ej. Fotorrealista, 8k, estilo Pixar" }
            ],
            ensamblar: (datos) => `Actúa como Ingeniero de Prompts profesional.\n\nTU TAREA:\nGenera el mejor prompt en INGLÉS para DALL-E/Midjourney basado en: "${datos.escena}". Estilo: ${datos.estilo}.\n\nCANDADO ESTRICTO:\nEntrega ÚNICA Y EXCLUSIVAMENTE el texto del prompt en inglés. NO saludes, NO des explicaciones. Solo el prompt puro listo para usar.`
        }
    };

    // Lógica para mostrar los campos dinámicamente
    selectCategoria.addEventListener('change', (e) => {
        const categoria = e.target.value;
        const configuracion = configPrompts[categoria];
        
        // Ocultar estado vacío, mostrar contenedor de campos
        emptyState.style.display = 'none';
        dynamicFieldsContainer.style.display = 'block';
        btnGenerate.style.display = 'block';
        fieldsWrapper.innerHTML = ''; 

        configuracion.campos.forEach(campo => {
            const div = document.createElement('div');
            div.className = 'input-wrapper';

            const label = document.createElement('label');
            label.setAttribute('for', campo.id);
            label.innerText = campo.label;

            let input;
            if (campo.tipo === 'textarea') {
                input = document.createElement('textarea');
                input.rows = 3;
            } else if (campo.tipo === 'select') {
                input = document.createElement('select');
                campo.opciones.forEach(opc => {
                    const option = document.createElement('option');
                    option.value = opc;
                    option.innerText = opc;
                    input.appendChild(option);
                });
            } else {
                input = document.createElement('input');
                input.type = 'text';
            }
            
            input.id = campo.id;
            input.className = 'form-control';
            if (campo.placeholder) input.placeholder = campo.placeholder;

            div.appendChild(label);
            div.appendChild(input);
            fieldsWrapper.appendChild(div);
        });
    });

    // Generar prompt
    btnGenerate.addEventListener('click', () => {
        const categoria = selectCategoria.value;
        const configuracion = configPrompts[categoria];
        
        const datosRecolectados = {};
        let todoLleno = true;

        configuracion.campos.forEach(campo => {
            const valor = document.getElementById(campo.id).value.trim();
            if(!valor) todoLleno = false;
            datosRecolectados[campo.id] = valor || "[DATO PENDIENTE POR LLENAR]";
        });

        if(!todoLleno) {
            alert("EduConnectRuben: ¡Asegúrate de llenar todos los campos para que la IA no se invente la información!");
        }

        const promptFinal = configuracion.ensamblar(datosRecolectados);
        outputPrompt.value = promptFinal;
    });

    // Copiar al portapapeles
    btnCopy.addEventListener('click', async () => {
        const text = outputPrompt.value;
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            const originalHTML = btnCopy.innerHTML;
            btnCopy.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
            btnCopy.style.color = '#059669';
            btnCopy.style.borderColor = '#059669';
            
            setTimeout(() => {
                btnCopy.innerHTML = originalHTML;
                btnCopy.style = '';
            }, 2500);
        } catch (err) {
            alert('Error al intentar copiar el texto.');
        }
    });
});