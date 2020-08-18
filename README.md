# web-buses

Estructura página web

Todas las páginas tienen:
- Encabezado: logo, íconos de las rutas, menú plegado
- Pie: menú completo, otra información

## Arquitectura de información (inventario de contenidos)

- / : (index.html) : avisos, próximos buses, noticias (anuncios)
    - /rutas/ : (rutas.html) : lista de rutas de la empresa
        - /rutas/sangabriel/ : (ruta.html) : próximo bus, horario, precios, mapas, (anuncios)
        - /rutas/acosta/ : (ruta.html) : próximo bus, horario, precios, mapas, (anuncios)
        - /rutas/… : (ruta.html) : otras rutas
    - /noticias/ : (noticias.html) : avisos, noticias (registro histórico de noticias)
    - /nosotros/ : (empresa.html) : reseña de la empresa, socios, patrocinadores
        - /nosotros/personal/ : (personal.html) : personal, cumpleaños
    - /comunidad/ : (comunidad.html) : reseña de la zona
        - /comunidad/sangabriel/ : (sangabriel.html) : historia de San Gabriel
        - /comunidad/acosta/ : (acosta.html) : historia de Acosta
        - /comunidad/…
    - /contacto/ : (contacto.html) : correo y teléfono, formulario de contacto (varios opciones: objetos perdidos, para mejorar, denuncias, etc.)

## Apps

- Rutas (Anyelo)
- Empresa (Fabián)
- Noticias (David)
- Información (Fabián)

# Modelos para cada app

- Noticias —> informaciones temporales para desplegar en varias secciones
    - (clase) Noticia: noticias generales que se muestran en inicio y en sección noticias
        - título
        - fecha
        - descripción corta
        - descripción larga
        - documento (opcional)
        - expiración
    - (clase) Aviso: avisos urgentes que se muestran en contenedor especial en página de inicio y en la de noticias
        - título
        - fecha
        - descripción corta
        - expiración
        - urgencia (1, 2, 3, asociado con íconos)
        - ligar a una noticia (opcional, crear noticia, ahí agregar documento)

- Información —> páginas estáticas con información que generalmente no va a cambiar
    - (clase) 
        - título
        - contenido
        - …

- Empresa —> información y actores relacionados con la empresa
    - (clase) Empresa: información general
        - descripción
    - (clase) Personal: descripción de todos los colaboradores
        - nombre
        - apellido
        - puesto
        - foto
        - …
    - (clase) Socios: descripción de todos los socios
    - (clase) Patrocinadores: descripción de todos los patrocinadores

- Rutas —> información del servicio según GTFS
    - (clase) Agencia: (agency) información general de la empresa, según GTFS
        - agency_id
        - agency_name
        - agency_url
        - …
    - (clase) Paradas: (stops) información de las paradas autorizadas, según GTFS
        - stop_id
        - stop_code
        - stop_name
        - …
    - (clase) Ruta: (routes) información general de la ruta, según GTFS
        - route_id
        - agency_id
        - route_short_name
        - …
    - (clase) Viaje: (trips) cada uno de los viajes con su horario, según GTFS
        - route_id
        - service_id
        - trip_id
        - …
    - (clase) Horario: (stop_times) la hora de partida de cada viaje
        - trip_id
        - arrival_time
        - departure_time
        - …
    - (clase) Calendario: (calendar) días en que funciona con distintos horarios (entre semana, sábados, domingos)
        - service_id (“entre_semana”, “sabado”, “domingo”, “feriado”)
        - monday
        - tuesday
        - … (ejemplo: entre_semana,1,1,1,1,1,0,0,20200815,20200915)
    - (clase) Feriados: (calendar_dates) excepciones a Calendario para los feriados del año
        - service_id
        - date
        - exception_type

## Notas mentales

- En views.py se “inyectan” las variables de interés a la página que se quiere mostrar mediante el “context” (un diccionario) que se referencia como {{ variable }} dentro del “template”. Por tanto, operaciones especiales se crean en views.py
- Hay una relación casi 1:1:1 entre urls -> views -> templates. Una url para cada view que tiene un template.

