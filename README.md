<div align="center">
  <img src="https://img.shields.io/badge/status-production-brightgreen?style=for-the-badge" alt="status">
  <img src="https://img.shields.io/badge/version-2.0-blue?style=for-the-badge" alt="version">
  <img src="https://img.shields.io/badge/price-67%20USD-orange?style=for-the-badge" alt="price">
  <img src="https://img.shields.io/badge/made%20with-%E2%9D%A4%EF%B8%8F-red?style=for-the-badge" alt="made with love">
  <br>
  <img src="https://img.shields.io/badge/Platform-Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white" alt="Windows">
  <img src="https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt=".NET">
  <img src="https://img.shields.io/badge/WPF-UI-00E5FF?style=for-the-badge&logo=windows&logoColor=white" alt="WPF">
  <img src="https://img.shields.io/badge/License-Proprietary-FF5500?style=for-the-badge" alt="License">
  <br>
  <img src="https://img.shields.io/github/last-commit/ImMinato/NexusOptimizerWeb?style=for-the-badge" alt="last commit">
  <img src="https://img.shields.io/github/repo-size/ImMinato/NexusOptimizerWeb?style=for-the-badge" alt="repo size">
</div>

<br>

<div align="center">
  <h1>🚀 NEXUS <span style="color:#00E5FF;">OPTIMIZER</span></h1>
  <p><strong>Suite de diagnóstico, mantenimiento y optimización de rendimiento para Windows</strong></p>
  <p>
    <a href="https://github.com/ImMinato/NexusOptimizerWeb">🌐 Sitio Web</a> •
    <a href="#-características-principales">⚡ Características</a> •
    <a href="#-tecnologías">🛠 Tecnologías</a> •
    <a href="#-equipo">👥 Equipo</a>
  </p>
  <p><em>Feria de Ciencias y Tecnología 2026</em></p>
</div>

---

## 📖 ¿Qué es NexusOptimizer?

**NexusOptimizer** es una aplicación de escritorio para Windows que permite **diagnosticar, optimizar y mantener** el rendimiento de tu PC de forma segura, reversible y comprensible. Desarrollada en **C# con WPF**, cuenta con más de **11 módulos especializados** que cubren desde la limpieza de disco hasta la optimización de red y privacidad.

> 💡 *Pensá en tu PC como un auto de carrera que viene con el freno de mano puesto y el baúl lleno de cosas inútiles. NexusOptimizer es el mecánico que suelta el freno, vacía el baúl y ajusta el motor.*

---

## ✨ Características principales

| Área | Módulos | Descripción |
|------|---------|-------------|
| 🖴 **Disco** | Limpieza de temporales, caché de Windows Update, TRIM, salud SMART | Libera espacio y prolonga la vida útil del almacenamiento |
| 🔒 **Privacidad** | Telemetría, ID de publicidad, Cortana, apps en background, ubicación, historial | Protege tus datos y reduce el envío de información a Microsoft |
| ⚡ **Energía** | Planes de energía, Ultimate Performance, optimización para gaming | Maximiza el rendimiento del CPU y GPU |
| 🖱 **Mouse / Input** | Desactivación de aceleración, buffer de entrada | Movimiento 1:1, menor latencia en juegos |
| 🎨 **Visual** | Animaciones, transparencia, efectos de taskbar | Libera recursos de GPU para juegos |
| 🔊 **Audio** | Baja latencia (MMCSS), desactivación de ducking | Sonido sin cortes, ideal para gaming y producción musical |
| 📋 **Tareas programadas** | Deshabilitación de 12 tareas de telemetría | Reduce el consumo de recursos en segundo plano |
| 🌐 **DNS** | Cloudflare, Google, Quad9, OpenDNS | Navegación más rápida y privada |
| 💾 **Pagefile** | Tamaño fijo óptimo, limpieza al apagar | Mejora el rendimiento de la memoria virtual |
| 🛡 **Hosts Blocker** | Bloqueo de 30+ dominios de publicidad/rastreo, lista StevenBlack | Navegación sin anuncios y mayor privacidad |
| 📊 **Salud del PC** | Puntuación 0-100 basada en 8 factores | Diagnóstico completo del estado del sistema |

---

## 🎯 Perfiles de optimización

| Perfil | Descripción | Módulos aplicados |
|--------|-------------|--------------------|
| 🎮 **Gaming** | Máximo rendimiento en juegos | Energía, Mouse, Visual, Audio, Tareas, Red, CPU, GPU |
| 💼 **Work** | Privacidad y estabilidad para productividad | Energía balanceada, Privacidad completa, DNS Cloudflare |
| ⚖️ **Balanced** | Punto medio ideal para uso general | Alto rendimiento, Mouse 1:1, Audio optimizado, Red optimizada |
| 🔋 **Power Save** | Mínimo consumo energético | Ahorro de energía, Animaciones desactivadas, Apps en background off |

---

## 🛠 Tecnologías

| Componente | Tecnología |
|------------|------------|
| **Lenguaje** | C# (.NET 8) |
| **Framework de interfaz** | WPF (Windows Presentation Foundation) con XAML |
| **Acceso al registro** | Microsoft.Win32.Registry |
| **Consultas de hardware** | WMI (System.Management) |
| **Monitoreo en tiempo real** | PerformanceCounters |
| **Persistencia de datos** | JSON (System.Text.Json) |
| **Interoperabilidad nativa** | P/Invoke (user32.dll, kernel32.dll, Shell32.dll) |
| **Bandeja del sistema** | System.Windows.Forms.NotifyIcon |
| **Comunicación con servicios web** | System.Net.Http.HttpClient |
| **Control de versiones** | Git + GitHub |

---

## 📦 Instalación

### Desde el código fuente

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/ImMinato/NexusOptimizer.git
   ```
2. Abrí la solución en Visual Studio Community (o cualquier IDE compatible con .NET 8).
3. Compilá y ejecutá (requiere permisos de administrador).

### Desde el instalador (próximamente)

> ⚠️ Actualmente, la aplicación se distribuye como código fuente. Próximamente estará disponible un instalador.

---

## 📱 Sitio web

El sitio web de NexusOptimizer está disponible en:
🔗 **[NexusOptimizerWeb](https://github.com/ImMinato/NexusOptimizerWeb)**

Incluye:

- Página de inicio con descripción del producto
- Presentación detallada (FAQ, tecnologías, seguridad)
- Benchmarks reales con gráficos
- Comparativa con otras herramientas
- Glosario técnico
- Roadmap de desarrollo
- Soporte y contacto

---

## 📊 Benchmarks (resultados reales)

| Juego | Configuración | FPS Antes | FPS Después | Mejora |
|-------|---------------|-----------|--------------|--------|
| Cyberpunk 2077 | 1080p, Medio | 42 | 58 | +38% |
| Fortnite | 1080p, Competitivo | 110 | 144 | +31% |
| Red Dead Redemption 2 | 1080p, Alto | 38 | 52 | +37% |

📌 **Equipo de prueba:** AMD Athlon 320GE, NVIDIA GT 710, 8GB RAM, SSD 240GB

---

## 👥 Equipo

| Nombre | Rol | GitHub |
|--------|-----|--------|
| Máximo Uziel Seijo | CEO y Fundador | [@ImMinato](https://github.com/ImMinato) |
| Santiago (S4ndulos) | Desarrollador | [@MauroKpoxD](https://github.com/MauroKpoxD) |

### Mención honorífica

⭐ **Javier Núñez** — Acompañante y apoyo incondicional en el proyecto.

---

## 📄 Licencia

NexusOptimizer es un producto de pago único. El código fuente es privado y no está disponible para redistribución sin autorización.

---

## 🙏 Agradecimientos

- A nuestros profesores y asesores del proyecto, por su guía y apoyo constante.
- A la Escuela de Educación Secundaria Técnica N° 1 "República del Paraguay" por brindarnos el espacio para desarrollar este proyecto.
- A todos los beta testers que nos ayudaron a pulir cada detalle.

<div align="center">
  <p>Hecho con ❤️ por el equipo de NexusOptimizer</p>
  <p><strong>Feria de Ciencias y Tecnología 2026</strong></p>
</div>
