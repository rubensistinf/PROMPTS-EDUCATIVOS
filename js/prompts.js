/**
 * Diccionario de Prompts con candados estrictos (Nivel Pro)
 * Cada categoría define sus campos requeridos y su lógica de ensamblaje (Prompt Engineering).
 */

const PROMPT_CONFIG = {
    // ----------------------------------------------------------------------
    // 1. ÁREA PEDAGÓGICA (MESCP)
    // ----------------------------------------------------------------------
    tema: {
        titulo: "🎯 Desarrollo de Tema / Contenido",
        icono: "fa-book",
        campos: [
            { id: "tema_exacto", label: "Tema Exacto", placeholder: "Ej. La Revolución Industrial", icon: "fa-book" },
            { id: "audiencia", label: "Audiencia / Nivel", placeholder: "Ej. Estudiantes de 4to de Secundaria", icon: "fa-users" },
            { id: "formato", label: "Formato de Salida", placeholder: "Ej. Ensayo corto, Resumen en viñetas", icon: "fa-file-lines" },
            { id: "regla", label: "Regla / Enfoque Especial", placeholder: "Ej. Lenguaje simple, sin tecnicismos", icon: "fa-circle-exclamation" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Educador Experto y Redactor Técnico.\n\nTAREA:\nDesarrolla el contenido sobre "${d.tema_exacto}".\n\nCONTEXTO Y AUDIENCIA:\nDirigido a ${d.audiencia}.\n\nFORMATO DE SALIDA:\n${d.formato}.\n\nRESTRICCIONES Y ENFOQUE:\n${d.regla}.\n\nREGLA ESTRICTA: Omite presentaciones, saludos o textos conversacionales. Entrega ÚNICAMENTE el contenido solicitado formateado correctamente en Markdown.`
    },
    pdc: {
        titulo: "📚 Plan de Clase / PDC",
        icono: "fa-bullseye",
        campos: [
            { id: "contenido", label: "Contenido Central", placeholder: "Ej. Redes Informáticas y Topologías", icon: "fa-bullseye" },
            { id: "escolaridad", label: "Año de Escolaridad", placeholder: "Ej. 5to de Secundaria Comunitaria Productiva", icon: "fa-graduation-cap" },
            { id: "tiempo", label: "Tiempo / Trimestre", placeholder: "Ej. Primer Trimestre / 4 Periodos", icon: "fa-calendar" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Pedagogo experto en el MESCP boliviano.\n\nTAREA:\nElabora un Plan de Desarrollo Curricular (PDC).\n\nTEMA: "${d.contenido}".\nAÑO DE ESCOLARIDAD: ${d.escolaridad}.\nTIEMPO ESTIMADO: ${d.tiempo}.\n\nESTRUCTURA REQUERIDA (Genera en formato de tablas):\n1. Datos referenciales.\n2. Objetivo Holístico (Ser, Saber, Hacer, Decidir).\n3. Momentos Metodológicos (Práctica, Teoría, Valoración, Producción).\n4. Recursos/Materiales.\n5. Criterios de Evaluación.\n\nREGLA ESTRICTA: Omite saludos. Solo entrega las tablas Markdown del PDC.`
    },
    evaluacion: {
        titulo: "📝 Generador de Evaluaciones",
        icono: "fa-file-signature",
        campos: [
            { id: "tema", label: "Tema a Evaluar", placeholder: "Ej. Mantenimiento Preventivo de Hardware", icon: "fa-file-signature" },
            { id: "cantidad", label: "Cantidad de Preguntas", placeholder: "Ej. 10", icon: "fa-list-ol", type: "number" },
            { id: "dificultad", label: "Dificultad y Tipo", placeholder: "Ej. Difícil, 5 opción múltiple y 5 desarrollo", icon: "fa-gauge-high" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Docente Evaluador Estricto.\n\nTAREA:\nDiseña un instrumento de evaluación.\n\nTEMA: "${d.tema}".\nCANTIDAD DE PREGUNTAS: ${d.cantidad}.\nDIFICULTAD/FORMATO: ${d.dificultad}.\n\nINSTRUCCIONES:\n1. Enumera las preguntas claramente sin respuestas para que el alumno lo llene.\n2. Al final del documento, bajo un título separado ("CLAVE DE RESPUESTAS"), proporciona las respuestas exactas y justificadas.\n\nREGLA ESTRICTA: Sin introducciones.`
    },
    rubricas: {
        titulo: "📊 Rúbricas de Evaluación",
        icono: "fa-diagram-project",
        campos: [
            { id: "proyecto", label: "Proyecto a Evaluar", placeholder: "Ej. Ensamblaje de una Computadora", icon: "fa-diagram-project" },
            { id: "nivel", label: "Nivel de los Estudiantes", placeholder: "Ej. Bachillerato Técnico Humanístico (BTH)", icon: "fa-users" },
            { id: "dimensiones", label: "Dimensiones a priorizar", placeholder: "Ej. Énfasis en el Hacer (60%) y Saber (40%)", icon: "fa-star" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Evaluador Académico.\n\nTAREA:\nDiseña una rúbrica de evaluación tabular.\n\nPROYECTO: "${d.proyecto}".\nNIVEL: ${d.nivel}.\nDIMENSIONES: ${d.dimensiones}.\n\nESTRUCTURA:\nUsa una tabla Markdown. Las filas deben ser los Criterios/Dimensiones. Las columnas deben ser los Niveles de Desempeño (Ej: Excelente, Bueno, Regular, Deficiente) con la descripción exacta de qué debe hacer el alumno para obtener esa nota.\n\nREGLA ESTRICTA: Muestra directamente la tabla.`
    },
    adaptacion: {
        titulo: "🧩 Adaptación Curricular (Inclusión)",
        icono: "fa-book-open",
        campos: [
            { id: "tema", label: "Tema de la Clase", placeholder: "Ej. Operaciones con Fracciones", icon: "fa-book-open" },
            { id: "diagnostico", label: "Diagnóstico del Estudiante", placeholder: "Ej. TDAH severo / Dislexia leve", icon: "fa-notes-medical" },
            { id: "adaptacion", label: "Tipo de Adaptación Preferida", placeholder: "Ej. Actividades cortas de 10 min, muy visual", icon: "fa-arrows-down-to-people" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Psicopedagogo especialista en Inclusión.\n\nTAREA:\nAdapta el plan de la clase.\n\nTEMA ORIGINAL: "${d.tema}".\nDIAGNÓSTICO DEL ALUMNO: ${d.diagnostico}.\nTIPO DE ADAPTACIÓN: ${d.adaptacion}.\n\nENTREGABLE:\n1. Ajuste Metodológico (Cómo enseñar el tema).\n2. Ajuste de Materiales (Qué recursos visuales/físicos usar).\n3. Ajuste de Evaluación (Cómo calificarlo justamente).\n\nREGLA ESTRICTA: Se directo, profesional y estructurado.`
    },
    tutoria: {
        titulo: "🤝 Tutoría y Seguimiento (Nuevo)",
        icono: "fa-hands-holding-child",
        campos: [
            { id: "caso", label: "Descripción del Caso", placeholder: "Ej. Alumno con bajo rendimiento por ausentismo", icon: "fa-clipboard-user" },
            { id: "objetivo", label: "Objetivo de la Reunión", placeholder: "Ej. Establecer un compromiso con los padres", icon: "fa-bullseye" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Orientador Educativo y Trabajador Social.\n\nTAREA:\nElabora una pauta estructurada para una reunión de tutoría.\n\nCASO DEL ESTUDIANTE: "${d.caso}".\nOBJETIVO: ${d.objetivo}.\n\nENTREGABLE:\n1. Agenda sugerida para la reunión (paso a paso).\n2. Preguntas clave (abiertas y empáticas) para hacerle a los padres/tutor.\n3. Modelo de "Acta de Compromiso" lista para llenar y firmar.\n\nREGLA ESTRICTA: Usa un tono empático pero formal. Entrega los recursos directamente en Markdown.`
    },
    proyecto_abp: {
        titulo: "🚀 Diseño de Proyecto (ABP)",
        icono: "fa-rocket",
        campos: [
            { id: "problema", label: "Problema o Reto del Contexto", placeholder: "Ej. Contaminación por basura en el colegio", icon: "fa-triangle-exclamation" },
            { id: "materia", label: "Materia / Área", placeholder: "Ej. Ciencias Naturales y Tecnología", icon: "fa-book" },
            { id: "producto", label: "Producto Final Esperado", placeholder: "Ej. Feria de reciclaje robótico", icon: "fa-trophy" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Experto en Aprendizaje Basado en Proyectos (ABP).\n\nTAREA:\nDiseña la estructura de un proyecto educativo.\n\nRETO/PROBLEMA: "${d.problema}".\nMATERIA: ${d.materia}.\nPRODUCTO ESPERADO: ${d.producto}.\n\nESTRUCTURA REQUERIDA:\n1. Título Atractivo del Proyecto.\n2. Pregunta Guía (Desafiante).\n3. Fases del Proyecto (Fase 1: Investigación, Fase 2: Desarrollo, Fase 3: Presentación) detallando qué harán los estudiantes en cada una.\n4. Competencias a Desarrollar.\n\nREGLA ESTRICTA: Entrega el plan directamente en formato de lista y tabla Markdown.`
    },
    dinamicas: {
        titulo: "🎲 Dinámicas Didácticas (Gamificación)",
        icono: "fa-dice",
        campos: [
            { id: "tema", label: "Tema a Enseñar", placeholder: "Ej. Las tablas de multiplicar", icon: "fa-graduation-cap" },
            { id: "edad", label: "Edad de los Estudiantes", placeholder: "Ej. Niños de 8 años", icon: "fa-child-reaching" },
            { id: "recursos", label: "Materiales Disponibles", placeholder: "Ej. Pizarrón, papel, marcadores", icon: "fa-box-open" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Diseñador de Gamificación Educativa.\n\nTAREA:\nCrea una dinámica didáctica (juego) interactiva en el aula.\n\nTEMA: "${d.tema}".\nEDAD: ${d.edad}.\nMATERIALES DISPONIBLES: ${d.recursos}.\n\nESTRUCTURA REQUERIDA:\n1. Nombre de la Dinámica.\n2. Reglas del Juego (Claras y en viñetas).\n3. Recompensas o Sistema de Puntos.\n4. Cómo se vincula con el aprendizaje teórico.\n\nREGLA ESTRICTA: Propón algo altamente interactivo y divertido, sin necesidad de tecnología avanzada.`
    },

    // ----------------------------------------------------------------------
    // 2. ÁREA DE OFIMÁTICA Y GESTIÓN
    // ----------------------------------------------------------------------
    word: {
        titulo: "📄 Guía / Documento Word",
        icono: "fa-heading",
        campos: [
            { id: "tema", label: "Tema Principal", placeholder: "Ej. Historia del Internet", icon: "fa-heading" },
            { id: "extension", label: "Extensión Aproximada", placeholder: "Ej. 2 páginas / 1000 palabras", icon: "fa-ruler" },
            { id: "estilo", label: "Estilo de Redacción", placeholder: "Ej. Formal académico", icon: "fa-comment-dots" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Redactor de Documentos Técnicos/Educativos.\n\nTAREA:\nRedacta un documento completo.\n\nTEMA: "${d.tema}".\nEXTENSIÓN: ${d.extension}.\nESTILO: ${d.estilo}.\n\nENTREGABLE:\nDocumento estructurado con Título (H1), Subtítulos (H2), uso de negritas para palabras clave y listas de viñetas para facilitar la lectura. Listo para copiar a Word.`
    },
    excel: {
        titulo: "📗 Plantilla Automática Excel",
        icono: "fa-table",
        campos: [
            { id: "objetivo", label: "Objetivo de la Plantilla", placeholder: "Ej. Registro de notas trimestrales", icon: "fa-table" },
            { id: "columnas", label: "Columnas Requeridas", placeholder: "Ej. Nombre, Nota 1, Nota 2, Promedio", icon: "fa-columns" },
            { id: "funciones", label: "Funciones Requeridas", placeholder: "Ej. Función SI, Promedio", icon: "fa-calculator" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Analista de Datos y Experto en Microsoft Excel.\n\nTAREA:\nDiseñar estructura y lógica para una plantilla.\n\nOBJETIVO: "${d.objetivo}".\nCOLUMNAS: ${d.columnas}.\nFUNCIONES: ${d.funciones}.\n\nENTREGABLE:\n1. Estructura recomendada de encabezados.\n2. CÓDIGO EXACTO DE LAS FÓRMULAS a utilizar (formato de bloque de código), explicando en qué celda pegarlas.\n3. Reglas sugeridas de Formato Condicional.\n\nREGLA ESTRICTA: Sin saludos ni relleno.`
    },
    pptx: {
        titulo: "📊 Estructura Presentación PPTX",
        icono: "fa-desktop",
        campos: [
            { id: "tema", label: "Tema de Presentación", placeholder: "Ej. El Sistema Solar", icon: "fa-desktop" },
            { id: "cantidad", label: "Cantidad de Diapositivas", placeholder: "Ej. 8", icon: "fa-layer-group", type: "number" },
            { id: "guion", label: "Guion de Orador", placeholder: "Ej. Sí, incluir notas detalladas", icon: "fa-microphone" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Diseñador Instruccional de Presentaciones.\n\nTAREA:\nCrea la estructura visual y de texto para diapositivas.\n\nTEMA: "${d.tema}".\nCANTIDAD DE DIAPOSITIVAS: ${d.cantidad}.\nGUION DE ORADOR: ${d.guion}.\n\nESTRUCTURA POR DIAPOSITIVA:\n- Título de Diapositiva.\n- Texto en Pantalla (Máx 4 viñetas cortas, muy resumidas).\n- Elemento Visual (Qué imagen, gráfico o icono buscar).\n- Notas del Orador (El texto exacto que debe leer el profesor).`
    },
    admin: {
        titulo: "🗂️ Gestión Administrativa Formal",
        icono: "fa-file-invoice",
        campos: [
            { id: "documento", label: "Tipo de Documento", placeholder: "Ej. Carta de citación, Circular, Informe técnico", icon: "fa-file-signature" },
            { id: "destinatario", label: "Destinatario", placeholder: "Ej. Padres de familia, Director Distrital", icon: "fa-user-tie" },
            { id: "asunto", label: "Asunto Principal", placeholder: "Ej. Suspensión de clases por fumigación", icon: "fa-circle-info" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Secretario Ejecutivo y Administrador Institucional.\n\nTAREA:\nRedacta un documento formal.\n\nTIPO: "${d.documento}".\nDESTINATARIO: ${d.destinatario}.\nASUNTO: ${d.asunto}.\n\nENTREGABLE:\nRedacta el documento listo para imprimir. Incluye marcadores de posición entre corchetes (ej. [FECHA], [NOMBRE DE INSTITUCIÓN]) donde corresponda. Usa un tono oficial, respetuoso y directo.\n\nREGLA ESTRICTA: Entrega solo el cuerpo del documento.`
    },
    correo: {
        titulo: "📧 Redactor de Correo Profesional",
        icono: "fa-envelope-open-text",
        campos: [
            { id: "destinatario", label: "A quién va dirigido", placeholder: "Ej. Equipo de docentes, Director", icon: "fa-address-book" },
            { id: "objetivo", label: "Objetivo del Correo", placeholder: "Ej. Convocar a reunión urgente sobre notas", icon: "fa-bullseye" },
            { id: "tono", label: "Tono del Correo", placeholder: "Ej. Formal, Urgente, Amigable", icon: "fa-comment-dots" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Asistente de Comunicación Corporativa.\n\nTAREA:\nRedacta un correo electrónico.\n\nDESTINATARIO: "${d.destinatario}".\nOBJETIVO: ${d.objetivo}.\nTONO: ${d.tono}.\n\nENTREGABLE:\n1. Un Asunto (Subject) claro, conciso y que llame la atención.\n2. El cuerpo del correo bien estructurado, usando negritas para las ideas principales, viñetas si es necesario listar cosas y un llamado a la acción (Call to Action) claro al final.\n\nREGLA ESTRICTA: Solo devuelve el Asunto y el Cuerpo del correo listos para enviar.`
    },

    // ----------------------------------------------------------------------
    // 3. ÁREA SISTEMAS / PROGRAMACIÓN
    // ----------------------------------------------------------------------
    taller: {
        titulo: "⚙️ Guía de Laboratorio / Taller",
        icono: "fa-screwdriver-wrench",
        campos: [
            { id: "practica", label: "Práctica a Realizar", placeholder: "Ej. Ponchado de Cables RJ45", icon: "fa-screwdriver-wrench" },
            { id: "herramientas", label: "Herramientas Disponibles", placeholder: "Ej. Crimpadora, Cable UTP", icon: "fa-toolbox" },
            { id: "entregable", label: "Entregable Esperado", placeholder: "Ej. Cable de red testeado", icon: "fa-clipboard-check" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Instructor Técnico de Laboratorio BTH.\n\nTAREA:\nRedacta una Guía de Práctica de Taller.\n\nPRÁCTICA: "${d.practica}".\nHERRAMIENTAS: ${d.herramientas}.\nENTREGABLE DEL ESTUDIANTE: ${d.entregable}.\n\nESTRUCTURA:\n1. Objetivo.\n2. Normas de Seguridad Previas.\n3. Procedimiento (Paso a paso numerado e imperativo).\n4. Lista de cotejo de validación final.`
    },
    frontend: {
        titulo: "🖥️ Código: Frontend (UI)",
        icono: "fa-html5",
        campos: [
            { id: "componente", label: "Componente o Interfaz", placeholder: "Ej. Formulario de Login", icon: "fa-desktop" },
            { id: "stack", label: "Stack Tecnológico", placeholder: "Ej. HTML5, CSS3 Vanilla", icon: "fa-code" },
            { id: "diseno", label: "Diseño / Librería", placeholder: "Ej. Tailwind, Glassmorphism", icon: "fa-wand-magic-sparkles" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Desarrollador Frontend Senior (UI/UX).\n\nTAREA:\nGenera código limpio y responsivo para una interfaz.\n\nCOMPONENTE: "${d.componente}".\nSTACK: ${d.stack}.\nDISEÑO/LIBRERÍA: ${d.diseno}.\n\nENTREGABLE:\nSolo proporciona los bloques de código necesarios (HTML, CSS, JS). Aplica mejores prácticas semánticas y diseño moderno responsivo. NO incluyas explicaciones de instalación, solo el código del componente.`
    },
    backend: {
        titulo: "🗄️ Código: Backend y BD",
        icono: "fa-server",
        campos: [
            { id: "logica", label: "Lógica / Funcionalidad", placeholder: "Ej. API REST para registrar asistencia", icon: "fa-server" },
            { id: "stack", label: "Lenguaje y Base de Datos", placeholder: "Ej. Node.js (Express) y PostgreSQL", icon: "fa-node-js" },
            { id: "requisitos", label: "Requisitos Adicionales", placeholder: "Ej. Validación JWT", icon: "fa-shield-halved" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Arquitecto Backend Senior.\n\nTAREA:\nGenera la lógica de servidor y base de datos.\n\nFUNCIONALIDAD: "${d.logica}".\nSTACK Y BD: ${d.stack}.\nREQUISITOS: ${d.requisitos}.\n\nENTREGABLE:\n1. Estructura de la Tabla/Modelo de Base de Datos.\n2. Bloque de código del Endpoint/Ruta principal.\n\nREGLA ESTRICTA: Usa buenas prácticas de seguridad, comentarios limpios y manejo de errores (Try/Catch). Solo devuelve código.`
    },
    tutor_codigo: {
        titulo: "🧑‍🏫 Tutor Explicador de Código",
        icono: "fa-chalkboard-user",
        campos: [
            { id: "codigo", label: "Código o Concepto que no entiendes", placeholder: "Ej. ¿Cómo funciona useEffect en React?", icon: "fa-code" },
            { id: "nivel", label: "Tu nivel de conocimiento", placeholder: "Ej. Soy principiante total", icon: "fa-battery-quarter" },
            { id: "objetivo", label: "Qué quieres lograr", placeholder: "Ej. Entenderlo con un ejemplo de la vida real", icon: "fa-crosshairs" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Mentor y Tutor de Programación Senior y Empático.\n\nTAREA:\nExplícame este código o concepto como si fuera una tutoría uno a uno.\n\nTEMA/CÓDIGO: "${d.codigo}".\nMI NIVEL: ${d.nivel}.\nOBJETIVO: ${d.objetivo}.\n\nENTREGABLE:\n1. Analogía de la vida real para entender el concepto central.\n2. Desglose paso a paso (línea por línea si es código) en lenguaje EXTREMADAMENTE SENCILLO.\n3. Un ejemplo práctico minimalista y limpio.\n\nREGLA ESTRICTA: No me des la solución a un problema directamente, guíame para que yo lo entienda. Usa un tono motivador y didáctico.`
    },
    debugging: {
        titulo: "🐛 Asistente de Debugging",
        icono: "fa-bug-slash",
        campos: [
            { id: "error", label: "Mensaje de Error Exacto", placeholder: "Ej. TypeError: Cannot read property 'map' of undefined", icon: "fa-triangle-exclamation" },
            { id: "lenguaje", label: "Lenguaje / Framework", placeholder: "Ej. JavaScript, React", icon: "fa-code" },
            { id: "contexto", label: "Qué intentabas hacer", placeholder: "Ej. Cargar datos de una API en una tabla", icon: "fa-list-check" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Ingeniero de Software Senior especialista en Resolución de Bugs.\n\nTAREA:\nAyúdame a diagnosticar y solucionar este error.\n\nERROR EN CONSOLA: "${d.error}".\nLENGUAJE: ${d.lenguaje}.\nCONTEXTO: ${d.contexto}.\n\nENTREGABLE:\n1. Explicación corta y técnica de por qué ocurre este error (Causa Raíz).\n2. Solución 1: La forma más rápida de arreglarlo (código).\n3. Solución 2: La forma más robusta/segura de evitar que vuelva a pasar (Best Practices).\n\nREGLA ESTRICTA: Se directo, usa bloques de código limpios y no des explicaciones largas innecesarias.`
    },
    arquitectura: {
        titulo: "🏗️ Diseñador de Arquitectura Software",
        icono: "fa-cubes",
        campos: [
            { id: "proyecto", label: "De qué trata el proyecto", placeholder: "Ej. Plataforma de venta de cursos tipo Udemy", icon: "fa-building" },
            { id: "escala", label: "Escala / Usuarios esperados", placeholder: "Ej. 10,000 usuarios concurrentes", icon: "fa-users-gear" },
            { id: "nube", label: "Infraestructura preferida", placeholder: "Ej. AWS, Vercel, o VPS económico", icon: "fa-cloud" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Arquitecto de Software Principal.\n\nTAREA:\nDiseña la arquitectura a alto nivel para un nuevo sistema.\n\nPROYECTO: "${d.proyecto}".\nESCALA ESTIMADA: ${d.escala}.\nINFRAESTRUCTURA: ${d.nube}.\n\nENTREGABLE:\n1. Patrón de arquitectura sugerido (Ej. Microservicios, Monolito Modular) justificando el por qué.\n2. Stack Tecnológico recomendado (Frontend, Backend, BD, Caché).\n3. Diagrama de flujo de datos (Explicado en texto usando viñetas lógicas, indicando cómo interactúan los servicios).\n4. Principales riesgos de cuello de botella.\n\nREGLA ESTRICTA: Tu respuesta debe ser altamente técnica pero estructurada para ser comprendida por un CTO.`
    },
    sql: {
        titulo: "🗄️ Generador y Optimizador SQL",
        icono: "fa-database",
        campos: [
            { id: "tablas", label: "Tablas Involucradas", placeholder: "Ej. usuarios(id, nombre), ventas(id, id_usuario, total)", icon: "fa-table-list" },
            { id: "objetivo", label: "Qué necesitas consultar", placeholder: "Ej. Top 5 usuarios que gastaron más en enero", icon: "fa-magnifying-glass-chart" },
            { id: "motor", label: "Motor SQL", placeholder: "Ej. PostgreSQL, MySQL, SQL Server", icon: "fa-server" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Administrador de Base de Datos (DBA) Senior.\n\nTAREA:\nEscribe y optimiza una consulta SQL.\n\nTABLAS/ESQUEMA: "${d.tablas}".\nOBJETIVO DE LA CONSULTA: ${d.objetivo}.\nMOTOR BD: ${d.motor}.\n\nENTREGABLE:\n1. La consulta SQL exacta y formateada.\n2. Explicación breve de las cláusulas utilizadas (Ej. por qué usaste LEFT JOIN vs INNER JOIN, o GROUP BY).\n3. Sugerencia de índices (Indexes) para que esta consulta se ejecute en milisegundos en grandes volúmenes de datos.\n\nREGLA ESTRICTA: Código SQL limpio en un bloque, nada de saludos.`
    },

    // ----------------------------------------------------------------------
    // 4. ÁREA MULTIMEDIA
    // ----------------------------------------------------------------------
    video: {
        titulo: "🎬 Guion para Video Educativo",
        icono: "fa-film",
        campos: [
            { id: "tema", label: "Tema del Video", placeholder: "Ej. ¿Qué es la Programación?", icon: "fa-film" },
            { id: "formato", label: "Plataforma / Formato", placeholder: "Ej. TikTok (Vertical, rápido)", icon: "fa-mobile-screen" },
            { id: "duracion", label: "Duración Exacta", placeholder: "Ej. 60 segundos", icon: "fa-clock" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Guionista Audiovisual y Productor Ejecutivo.\n\nTAREA:\nEscribe un guion técnico para video.\n\nTEMA: "${d.tema}".\nPLATAFORMA/FORMATO: ${d.formato}.\nDURACIÓN: ${d.duracion}.\n\nESTRUCTURA: Usa una tabla de dos columnas. Columna 1: [VISUAL/TIEMPO] (Describe qué se ve en cámara, texto en pantalla o B-Roll). Columna 2: [AUDIO/LOCUCIÓN] (Lo que lee el narrador o SFX). Incluye un gancho (hook) poderoso en los primeros 3 segundos.`
    },
    audio: {
        titulo: "🎙️ Guion para Podcast",
        icono: "fa-podcast",
        campos: [
            { id: "tema", label: "Tema del Podcast", placeholder: "Ej. Historia de la IA", icon: "fa-podcast" },
            { id: "formato", label: "Formato y Tono", placeholder: "Ej. Monólogo narrativo, misterioso", icon: "fa-microphone-lines" },
            { id: "duracion", label: "Duración y SFX", placeholder: "Ej. 5 minutos, con efectos sci-fi", icon: "fa-headphones" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Productor Creativo de Podcasts.\n\nTAREA:\nEscribe el guion para un track de audio/podcast.\n\nTEMA: "${d.tema}".\nFORMATO/TONO: ${d.formato}.\nDURACIÓN/SFX: ${d.duracion}.\n\nINSTRUCCIONES: Escribe el guion separando claramente los bloques de locución de las instrucciones del editor. Usa corchetes para música y efectos (Ej: [MÚSICA: Sube volumen, ritmo de suspenso]).`
    },
    imagen: {
        titulo: "🎨 Generador de Imágenes (IA)",
        icono: "fa-image",
        campos: [
            { id: "sujeto", label: "Sujeto Principal y Acción", placeholder: "Ej. Un maestro enseñando código a un androide", icon: "fa-image" },
            { id: "entorno", label: "Entorno o Fondo", placeholder: "Ej. Aula futurista brillante", icon: "fa-mountain-sun" },
            { id: "estilo", label: "Estilo Artístico / Render", placeholder: "Ej. Flat design, 8k, colores pastel", icon: "fa-palette" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Ingeniero de Prompts Visuales (Midjourney V6 / DALL-E 3).\n\nTAREA:\nCrea un prompt maestro en INGLÉS.\n\nSUJETO: "${d.sujeto}".\nENTORNO: ${d.entorno}.\nESTILO/RENDER: ${d.estilo}.\n\nENTREGABLE: Un único bloque de texto en inglés con la estructura: [Sujeto hiper detallado], [Acción/Pose], [Entorno detallado], [Estilo artístico], [Iluminación, cámara, renderizado 8k].\n\nREGLA ESTRICTA: Únicamente devuelve el texto del prompt, en inglés, sin explicaciones.`
    },
    copywriting: {
        titulo: "✍️ Copywriting para Redes (Educativo)",
        icono: "fa-pen-nib",
        campos: [
            { id: "tema", label: "Tema o Curso a Promocionar", placeholder: "Ej. Nuevo curso de Excel desde cero", icon: "fa-bullhorn" },
            { id: "plataforma", label: "Red Social Destino", placeholder: "Ej. Instagram (Reel/Post), Facebook, LinkedIn", icon: "fa-hashtag" },
            { id: "accion", label: "Llamado a la Acción (CTA)", placeholder: "Ej. Que hagan clic en el link de mi bio", icon: "fa-hand-pointer" }
        ],
        ensamblar: (d) => `ACTÚA COMO: Copywriter Especializado en Marketing Educativo.\n\nTAREA:\nEscribe el texto (caption) persuasivo para una publicación en redes sociales.\n\nTEMA: "${d.tema}".\nPLATAFORMA: ${d.plataforma}.\nCTA ESPERADO: ${d.accion}.\n\nENTREGABLE:\n1. Gancho Inicial (Hook): Una frase impactante que rompa el scroll.\n2. Cuerpo del Mensaje: Beneficios claros usando emojis espaciados (método AIDA: Atención, Interés, Deseo, Acción).\n3. Llamado a la Acción explícito.\n4. Sugerencia de 5 hashtags optimizados y relevantes.\n\nREGLA ESTRICTA: Adapta el tono a la plataforma. No entregues explicaciones teóricas, solo el texto listo para publicar.`
    }
};
