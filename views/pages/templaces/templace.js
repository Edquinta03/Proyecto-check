const header = document.querySelector('header');
const footer = document.querySelector('footer');

header.innerHTML = `
<div class="sidebar d-flex flex-column p-3">
    <h4 class="text-white">Menú</h4>
    <ul class="nav flex-column">
      <li class="nav-item">
        <a class="nav-link" href="#"><i class="bi bi-house-door"></i> Inicio</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="#"><i class="bi bi-briefcase"></i> Trabajos</a>
      </li>

      <li class="nav-item">
        <a class="nav-link dropdown-toggle" href="#" id="proyectosDropdown" role="button" data-bs-toggle="collapse" data-bs-target="#proyectosSubMenu" aria-expanded="false" aria-controls="proyectosSubMenu">
          <i class="bi bi-rocket"></i> Registros
        </a>
        <ul class="collapse" id="proyectosSubMenu">
          <li class="ps-3">
            <a class="nav-link" href="../Public/contenido/insert/RegistroAlumno.html">Alumno</a>
          </li>
          <li class="ps-3">
            <a class="nav-link" href="../Public/contenido/insert/RegistroProfesor.html">Profesor</a>
          </li>
          <li class="ps-3">
            <a class="nav-link" href="../Public/contenido/insert/RegistroCarrera.html">Carrera</a>
          </li>
          <li class="ps-3">
            <a class="nav-link" href="../Public/contenido/insert/RegistroFacultad.html">Facultad</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>

`;

footer.innerHTML = `

<div class="container">
    <div class="row">
    
    <hr class="bg-light">
    <div class="text-center">
      <p class="mb-0">&copy; 2024 Universidad Autónoma del Carmen. Todos los derechos reservados.</p>
    </div>
      
    </div>
</div>

`; 