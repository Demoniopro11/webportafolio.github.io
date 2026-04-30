// Data management using static array
let archivos = [
  {
    id: 1,
    title: "Semana 1 - Introducción",
    desc: "Trabajo sobre conceptos básicos",
    data: "./archivos/INFORME_TÉCNICO.pdf",
    type: "pdf",
    week: 1,
    fileName: "INFORME_TÉCNICO.pdf"
  },
  {
    id: 2,
    title: "Semana 2 - Modelo Relacional",
    desc: "Ejercicios prácticos",
    data: "./archivos/CUADRO_COMPARATIVO.pdf",
    type: "pdf",
    week: 2,
    fileName: "CUADRO_COMPARATIVO.pdf"
  },
  {
    id: 3,
    title: "Semana 2 - Instalación_SQL",
    desc: "Ejercicios prácticos",
    data: "./archivos/Instalación_SQL.pdf",
    type: "pdf",
    week: 2,
    fileName: "Instalación_SQL.pdf"
  },
  {
    id: 4,
    title: "Semana 2 - Modelo_Entidad_Relación",
    desc: "Ejercicios prácticos",
    data: "./archivos/Modelo_Entidad_Relación.pdf",
    type: "pdf",
    week: 2,
    fileName: "Modelo_Entidad_Relación.pdf"
  },
   {
    id: 5,
    title: "Semana 3 - Resumen y Presentación",
    desc: "Resumen y Presentación",
    data: "https://prezi.com/view/UcDWANeQlhI6RIorzDlk/?referral_token=lMygC9lnB3FN", // Enlace web
    type: "link", // Cambié el tipo a link
    week: 3,
    fileName: "Ver presentación"
  },

];
const getFiles = () => archivos;
const saveFiles = (files) => {
  archivos = files;
  console.log("Cambios guardados temporalmente en memoria. Para que los cambios sean permanentes, debes modificar el array 'archivos' en script.js.");
};

// Global UI Elements
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      setTimeout(() => loader.remove(), 600);
    }, 600);
  }

  // Inicializar Intersection Observer para animaciones al scrollear
  const animateElements = document.querySelectorAll('.hidden-animate');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(el => observer.observe(el));

  // Ripple Effect Initialization
  initRippleEffect();
});

function initRippleEffect() {
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    const rect = btn.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    const existingRipple = btn.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }

    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
}

// Navbar Blur on Scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) {
    if (window.scrollY > 50) nav.classList.add('navbar-scrolled');
    else nav.classList.remove('navbar-scrolled');
  }
});

// Toast Notifications
window.showToast = function (message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = type === 'success' ? `<i class="fas fa-check-circle" style="color: var(--success-color); font-size: 1.2rem;"></i> <span style="font-weight: 500;">${message}</span>` : `<i class="fas fa-exclamation-circle" style="color: var(--danger-color); font-size: 1.2rem;"></i> <span style="font-weight: 500;">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fadeOutRight 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// Lightbox / Modal Visualizer
window.viewMedia = function (url, type) {
  const modal = document.getElementById('lightboxModal');
  const content = document.getElementById('lightboxContent');
  if (!modal || !content) {
    // Fallback si no existe el modal
    window.open(url, '_blank');
    return;
  }
  content.innerHTML = '';
  if (type === 'image') {
    content.innerHTML = `<img src="${url}" style="max-width:100%; max-height:100%; border-radius:8px; object-fit:contain; animation: fadeIn 0.3s ease;">`;
  } else {
    content.innerHTML = `<iframe src="${url}" style="width:100%; height:100%; min-height: 500px; border:none; border-radius:8px; animation: fadeIn 0.3s ease;"></iframe>`;
  }
  modal.classList.add('active');
};

window.closeModal = function () {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      document.getElementById('lightboxContent').innerHTML = '';
    }, 300);
  }
};

// Cierre de modal al hacer clic fuera del contenido
document.addEventListener('click', (e) => {
  const modal = document.getElementById('lightboxModal');
  if (modal && modal.classList.contains('active') && e.target === modal) {
    closeModal();
  }
});

// Original openFile as fallback / download
window.openFile = function (dataUrl, fileName) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Login Logic
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;
    const errorMsg = document.getElementById('errorMsg');

    if (user === 'admin' && pass === '1234') {
      localStorage.setItem('portafolio_auth', 'true');
      window.location.href = './admin.html';
    } else {
      errorMsg.style.display = 'block';
      loginForm.style.transform = 'translateX(10px)';
      setTimeout(() => loginForm.style.transform = 'translateX(-10px)', 100);
      setTimeout(() => loginForm.style.transform = 'translateX(0)', 200);
    }
  });
}

// Admin Protection and Logic
if (window.location.pathname.includes('admin.html')) {
  if (localStorage.getItem('portafolio_auth') !== 'true') {
    window.location.href = './login.html';
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('portafolio_auth');
      window.location.href = './index.html';
    });
  }

  let editingId = null;
  let fileToDelete = null;

  // Handle Form Upload & Edit
  const adminForm = document.getElementById('adminForm');
  if (adminForm) {
    adminForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('title').value;
      const desc = document.getElementById('desc').value;
      const week = document.getElementById('week').value;
      const fileInput = document.getElementById('fileInput');
      const submitBtn = adminForm.querySelector('button[type="submit"]');

      if (!editingId && fileInput.files.length === 0) {
        showToast('Por favor selecciona un archivo para subir.', 'error');
        return;
      }

      const processSave = (fileData, fileType, fileName) => {
        const files = getFiles();
        if (editingId) {
          const index = files.findIndex(f => f.id === editingId);
          if (index !== -1) {
            files[index].title = title;
            files[index].desc = desc;
            files[index].week = parseInt(week);
            if (fileData) {
              files[index].data = fileData;
              files[index].type = fileType;
              files[index].fileName = fileName;
            }
          }
          showToast('¡Archivo actualizado correctamente!');
        } else {
          const newEntry = {
            id: Date.now(),
            title,
            desc,
            week: parseInt(week),
            type: fileType,
            data: fileData,
            fileName: fileName
          };
          files.push(newEntry);
          showToast('¡Archivo guardado en la Semana ' + week + '!');
        }

        try {
          saveFiles(files);
          adminForm.reset();
          cancelEdit();
          renderAdminFiles();
        } catch (error) {
          if (error.name === 'QuotaExceededError') {
            showToast('Error: Límite de almacenamiento excedido. Sube un archivo más ligero.', 'error');
          } else {
            showToast('Ocurrió un error al guardar.', 'error');
          }
        } finally {
          submitBtn.innerHTML = '<i class="fas fa-save"></i> Guardar y Publicar Archivo';
          submitBtn.disabled = false;
        }
      };

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
      submitBtn.disabled = true;

      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // 6. Validación de Tamaño de Archivos: Máximo 10 MB
        if (file.size > 10 * 1024 * 1024) {
          showToast('Error: El archivo excede el límite de 10 MB.', 'error');
          submitBtn.innerHTML = '<i class="fas fa-save"></i> Guardar y Publicar Archivo';
          submitBtn.disabled = false;
          return;
        }

        const fileType = file.type.includes('image') ? 'image' : 'pdf';
        const fileName = file.name;
        // 1. Guardar URL relativa en lugar de base64
        const fileData = './archivos/' + fileName;

        // Simulación de "Subida" a carpeta local para entornos sin backend:
        // Disparamos una descarga automática para que el usuario pueda moverlo a la carpeta /archivos/
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 100);

        processSave(fileData, fileType, fileName);
      } else {
        processSave(null, null, null);
      }
    });
  }

  // Confirm Modal Delete Logic
  window.deleteFile = function (id) {
    fileToDelete = id;
    document.getElementById('confirmModal').classList.add('active');
  };

  document.getElementById('cancelConfirmBtn')?.addEventListener('click', () => {
    document.getElementById('confirmModal').classList.remove('active');
    fileToDelete = null;
  });

  document.getElementById('acceptConfirmBtn')?.addEventListener('click', () => {
    if (fileToDelete) {
      let files = getFiles();
      files = files.filter(f => f.id !== fileToDelete);
      saveFiles(files);
      document.getElementById('confirmModal').classList.remove('active');
      renderAdminFiles();
      showToast('Archivo eliminado exitosamente.', 'success');
      fileToDelete = null;
    }
  });

  window.editFile = function (id) {
    const files = getFiles();
    const file = files.find(f => f.id === id);
    if (file) {
      editingId = id;
      document.getElementById('title').value = file.title;
      document.getElementById('desc').value = file.desc;
      document.getElementById('week').value = file.week;
      document.getElementById('fileInput').required = false;

      const submitBtn = document.querySelector('#adminForm button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-save"></i> Guardar Cambios';
      submitBtn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';

      let cancelBtn = document.getElementById('cancelEditBtn');
      if (!cancelBtn) {
        cancelBtn = document.createElement('button');
        cancelBtn.id = 'cancelEditBtn';
        cancelBtn.type = 'button';
        cancelBtn.className = 'btn btn-danger';
        cancelBtn.innerHTML = '<i class="fas fa-times"></i> Cancelar Edición';
        cancelBtn.style.width = '100%';
        cancelBtn.style.marginTop = '1rem';
        cancelBtn.onclick = cancelEdit;
        submitBtn.parentNode.insertBefore(cancelBtn, submitBtn.nextSibling);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  window.cancelEdit = function () {
    editingId = null;
    document.getElementById('adminForm').reset();
    document.getElementById('fileInput').required = true;
    const submitBtn = document.querySelector('#adminForm button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Guardar y Publicar Archivo';
    submitBtn.style.background = '';
    const cancelBtn = document.getElementById('cancelEditBtn');
    if (cancelBtn) cancelBtn.remove();
  };

  // Filter Logic Admin
  const adminFilter = document.getElementById('adminFilterWeek');
  if (adminFilter) {
    adminFilter.addEventListener('change', () => renderAdminFiles());
  }

  window.renderAdminFiles = function () {
    const container = document.getElementById('adminFilesContainer');
    if (!container) return;

    let files = getFiles();
    const filterVal = document.getElementById('adminFilterWeek')?.value || 'all';

    if (filterVal !== 'all') {
      files = files.filter(f => f.week === parseInt(filterVal));
    }

    if (files.length === 0) {
      container.innerHTML = '<p style="text-align:center; color:var(--text-muted); padding: 2rem;">No hay archivos en esta vista.</p>';
      return;
    }

    files.sort((a, b) => a.week - b.week);

    container.innerHTML = `
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; color: white;">
              <thead>
                  <tr style="border-bottom: 2px solid var(--glass-border); background: rgba(255,255,255,0.05);">
                      <th style="padding: 1rem; text-align: left;">Semana</th>
                      <th style="padding: 1rem; text-align: left;">Título</th>
                      <th style="padding: 1rem; text-align: left;">Tipo</th>
                      <th style="padding: 1rem; text-align: center;">Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  ${files.map(f => `
                      <tr style="border-bottom: 1px solid var(--glass-border); transition: background 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
                          <td style="padding: 1rem;">Semana ${f.week}</td>
                          <td style="padding: 1rem; font-weight:500;">${f.title}</td>
                          <td style="padding: 1rem;">
                              <i class="fas ${f.type === 'pdf' ? 'fa-file-pdf' : 'fa-image'}" style="color: ${f.type === 'pdf' ? 'var(--danger-color)' : 'var(--accent-color)'}"></i>
                          </td>
                          <td style="padding: 1rem; text-align: center;">
                              <button onclick="editFile(${f.id})" class="btn" style="background:#f59e0b; color:white; padding: 0.4rem 0.8rem; margin-right: 0.5rem; font-size:0.85rem;"><i class="fas fa-edit"></i></button>
                              <button onclick="deleteFile(${f.id})" class="btn btn-danger" style="padding: 0.4rem 0.8rem; font-size:0.85rem;"><i class="fas fa-trash"></i></button>
                          </td>
                      </tr>
                  `).join('')}
              </tbody>
          </table>
        </div>
      `;
  };
}

// Render Weeks on Index Page
const renderIndexWeeks = () => {
  const container = document.getElementById('indexWeeksContainer');
  if (!container) return;

  const filterVal = document.getElementById('searchWeekIndex')?.value.toLowerCase() || '';
  const files = getFiles();
  let html = '';

  for (let i = 1; i <= 16; i++) {
    const weekFiles = files.filter(f => f.week === i);
    const hasContent = weekFiles.length > 0;
    const delay = (i * 0.05);

    let statusHtml = '';
    let titleHtml = '';
    let progressWidth = hasContent ? '100%' : '0%';
    let searchTitle = '';

    if (hasContent) {
      statusHtml = `<span style="background: rgba(16, 185, 129, 0.15); color: var(--success-color); padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(16, 185, 129, 0.3);"><i class="fas fa-check-circle"></i> Completado</span>`;
      titleHtml = `<p style="color: var(--text-color); font-size: 0.95rem; margin-top: 1rem; font-weight:500; height: 40px; overflow: hidden; text-overflow: ellipsis;">${weekFiles[0].title}</p>`;
      searchTitle = weekFiles[0].title.toLowerCase();
    } else {
      statusHtml = `<span style="background: rgba(255, 255, 255, 0.05); color: var(--text-muted); padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.85rem; border: 1px solid rgba(255, 255, 255, 0.1);"><i class="fas fa-clock"></i> Pendiente</span>`;
      titleHtml = `<p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 1rem; height: 40px;">-</p>`;
    }

    // Search Filter Logic
    const weekText = `semana ${i}`;
    if (filterVal && !weekText.includes(filterVal) && !searchTitle.includes(filterVal)) {
      continue; // Skip rendering this card if it doesn't match search
    }

    html += `
            <div class="card animate-slide-up" style="animation-delay: ${delay}s;">
                <div class="card-content" style="text-align: center; justify-content: center; align-items: center; padding: 2rem 1.5rem;">
                    <div style="margin-bottom: 1rem;">
                        ${statusHtml}
                    </div>
                    <h3 class="card-title" style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--accent-color);">Semana ${i}</h3>
                    ${titleHtml}
                    
                    <div class="progress-bg">
                        <div class="progress-bar" style="width: ${progressWidth}"></div>
                    </div>

                    <a href="./semana${i}.html" class="btn btn-primary" style="margin-top: 1.5rem; width: 100%;"><i class="fas fa-sign-in-alt"></i> Entrar</a>
                </div>
            </div>
        `;
  }

  if (html === '') {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:var(--text-muted);">No se encontraron resultados para tu búsqueda.</p>';
  } else {
    container.innerHTML = html;
    // Trigger setTimeout to animate progress bars visually after DOM insertion
    setTimeout(() => {
      const bars = document.querySelectorAll('.progress-bar');
      bars.forEach(b => {
        const w = b.style.width;
        b.style.width = '0%';
        setTimeout(() => b.style.width = w, 100);
      });
    }, 100);
  }
};

// Search filter listener for Index
const searchInput = document.getElementById('searchWeekIndex');
if (searchInput) {
  searchInput.addEventListener('keyup', renderIndexWeeks);
}

// Dynamic Rendering for Week Pages
const renderFiles = () => {
  const container = document.getElementById('filesContainer');
  if (!container) return;

  const currentWeek = parseInt(container.dataset.week);
  const files = getFiles();
  const weekFiles = files.filter(f => f.week === currentWeek);

  if (weekFiles.length === 0) {
    container.innerHTML = `
      <div class="animate-fade-in" style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; background: var(--glass-bg); border-radius: 20px; border: 1px dashed var(--glass-border);">
        <i class="fas fa-folder-open" style="font-size: 4rem; color: var(--text-muted); margin-bottom: 1.5rem; opacity: 0.5;"></i>
        <h3 style="color: var(--text-color); margin-bottom: 0.5rem;">Carpeta Vacía</h3>
        <p style="color: var(--text-muted); font-size: 1.1rem;">No hay archivos subidos para esta semana aún.</p>
        ${localStorage.getItem('portafolio_auth') === 'true'
        ? '<a href="./admin.html" class="btn btn-primary" style="margin-top: 1.5rem;"><i class="fas fa-plus"></i> Subir Archivo</a>'
        : ''}
      </div>`;
    return;
  }

  container.innerHTML = weekFiles.map((file, index) => {
    const delay = index * 0.15;
    let preview = '';

    if (file.type === 'image') {
      preview = `<div style="overflow:hidden; height: 220px; border-bottom: 1px solid var(--glass-border);"><img src="${file.data}" alt="${file.title}" style="width:100%; height:100%; object-fit:cover; transition: transform 0.5s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'" loading="lazy"></div>`;
    } else {
      preview = `<div class="card-img-preview" style="background: linear-gradient(135deg, rgba(239,68,68,0.1), rgba(239,68,68,0.05));"><i class="fas fa-file-pdf" style="color: var(--danger-color);"></i></div>`;
    }

    const icon = file.type === 'pdf' ? 'fa-file-pdf' : 'fa-image';
    const actionText = file.type === 'pdf' ? 'Ver Documento' : 'Ver Imagen';

    return `
      <div class="card animate-slide-up" style="animation-delay: ${delay}s">
        ${preview}
        <div class="card-content">
          <h3 class="card-title">${file.title}</h3>
          <p class="card-desc">${file.desc}</p>
          <div style="display:flex; gap:0.5rem;">
              <button onclick="viewMedia('${file.data}', '${file.type}')" class="btn btn-primary" style="flex:1;">
                <i class="fas fa-eye"></i> ${actionText}
              </button>
              <button onclick="openFile('${file.data}', '${file.fileName}')" class="btn" style="background: rgba(255,255,255,0.1); color:white;" title="Descargar">
                <i class="fas fa-download"></i>
              </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

// Navbar dynamic state
const updateNavbar = () => {
  const authItem = document.getElementById('authNav');
  if (authItem) {
    if (localStorage.getItem('portafolio_auth') === 'true') {
      authItem.innerHTML = `<a href="./admin.html" class="btn btn-primary" style="background: linear-gradient(135deg, #10b981, #059669); box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);"><i class="fas fa-cog"></i> Panel Admin</a>`;
    }
  }
}

// Active state for navigation links
const setActiveLink = () => {
  const path = window.location.pathname;
  if (path.endsWith('/') || path.endsWith('index.html')) return;

  const links = document.querySelectorAll('.dropdown-item');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && path.includes(href.replace('./', ''))) {
      link.style.background = 'var(--glass-bg)';
      link.style.color = 'var(--accent-color)';
      link.style.transform = 'translateX(5px)';

      const parentLink = link.closest('.nav-item')?.querySelector('.nav-link');
      if (parentLink) {
        parentLink.style.color = 'var(--accent-color)';
      }
    }
  });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderFiles();
  renderIndexWeeks();
  if (window.location.pathname.includes('admin.html')) {
    renderAdminFiles();
  }
  updateNavbar();
  setActiveLink();
});


window.addEventListener("load", () => {
  const splash = document.getElementById("splash");

  // ✅ PROTEGER EL CANVAS (CLAVE)
  const canvas = document.getElementById("particles");

  if (canvas) {
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedY: Math.random() * 0.5 + 0.2
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.y -= p.speedY;
        if (p.y < 0) p.y = canvas.height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(168,85,247,0.7)";
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ✅ SPLASH SIEMPRE SE CIERRA
  if (splash) {
    setTimeout(() => {
      splash.classList.add("fade-out");

      setTimeout(() => {
        splash.style.display = "none";
      }, 1200);

    }, 3000);
  }
});


// 🔥 PLAN B (ANTI BUG TOTAL)
setTimeout(() => {
  const splash = document.getElementById("splash");
  if (splash) splash.style.display = "none";
}, 5000);


// 🌌 GALAXIA PRO INTERACTIVA
(function () {
  const canvas = document.getElementById("galaxy-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
  };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  let stars = [];

  // ⭐ crear estrellas
  for (let i = 0; i < 140; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
      baseX: 0,
      baseY: 0,
      speed: Math.random() * 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      // 🌌 movimiento base (caída lenta)
      star.y += star.speed;
      if (star.y > canvas.height) star.y = 0;

      // 🧲 interacción con mouse (parallax + atracción suave)
      let dx = mouse.x - star.x;
      let dy = mouse.y - star.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        star.x -= dx * 0.002;
        star.y -= dy * 0.002;
      }

      // ✨ brillo dinámico
      let brightness = 0.5 + Math.sin(Date.now() * 0.002 + star.x) * 0.5;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${brightness})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
})();

const toggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  nav.classList.toggle("active");
});

/* abrir unidades en móvil */
document.querySelectorAll(".nav-item > .nav-link").forEach(link => {
  link.addEventListener("click", function(e) {
    if (window.innerWidth <= 768) {
      const parent = this.parentElement;

      if (parent.querySelector(".dropdown-menu")) {
        e.preventDefault();
        parent.classList.toggle("active");
      }
    }
  });
});

