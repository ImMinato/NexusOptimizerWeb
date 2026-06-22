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

**NexusOptimizer** es una aplicación de escritorio para Windows que permite **diagnosticar, optimizar y mantener** el rendimiento de tu PC de forma segura, reversible y comprensible. Desarrollada en **C# con WPF**, está organizada en **27 módulos independientes** que cubren seis áreas funcionales: hardware y energía, disco y almacenamiento, red y privacidad, mantenimiento del sistema, diagnóstico mediante benchmarking, e infraestructura de soporte.

El proyecto es la evolución de un script de Batch previo (*ByteFix Edition*), migrado y ampliado hacia una aplicación completa con interfaz gráfica, persistencia de datos y un sistema de perfiles de optimización.

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
| 📋 **Tareas programadas** | Deshabilitación de tareas de telemetría | Reduce el consumo de recursos en segundo plano |
| 🌐 **DNS** | Cloudflare, Google, Quad9, OpenDNS | Navegación más rápida y privada |
| 💾 **Pagefile** | Tamaño fijo óptimo, limpieza al apagar | Mejora el rendimiento de la memoria virtual |
| 🛡 **Hosts Blocker** | Bloqueo de dominios de publicidad/rastreo, lista StevenBlack | Navegación sin anuncios y mayor privacidad |
| 🎮 **GPU** | Tweaks específicos según fabricante (NVIDIA/AMD) | Reduce latencia gráfica en juegos |
| 📊 **Salud del PC** | Health Score de 0 a 100 | Diagnóstico completo del estado del sistema |
| ⏱ **Benchmark** | Motor de medición + historial de hasta 50 sesiones | Compara rendimiento antes y después de optimizar |
| 📶 **Test de velocidad** | Descarga, subida y latencia vía endpoints de Cloudflare | Sin depender de apps de terceros |
| ⚙️ **Infraestructura** | Logger, SettingsManager, NotificationService, RestorePointHelper, UpdateChecker | Registro de eventos, configuración persistente, notificaciones y respaldo automático |

> Esta tabla agrupa los módulos por área funcional. El detalle completo de los **27 módulos** está documentado en el Informe Técnico del proyecto.

---

## 🎯 Perfiles de optimización

| Perfil | Descripción | Módulos aplicados |
|--------|-------------|--------------------|
| 🎮 **Gaming** | Máximo rendimiento en juegos | Energía, Mouse, Visual, Audio, Tareas, Red, GPU (8 módulos en una sola operación) |
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

**Escala del proyecto:** ~11.000 líneas de código distribuidas en ~35 archivos, organizadas en una arquitectura de 4 capas (presentación, lógica, servicios transversales y sistema).

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
- Presentación detallada (objetivos, arquitectura, marco teórico, seguridad)
- Benchmarks reales con gráficos
- Comparativa con otras herramientas
- Glosario técnico
- Roadmap de desarrollo
- Soporte y contacto, con consulta directa por WhatsApp

---

## 📊 Benchmarks (resultados reales)

| Juego | Configuración | FPS Antes | FPS Después | Mejora |
|-------|---------------|-----------|--------------|--------|
| Cyberpunk 2077 | 1080p, Medio | 42 | 58 | +38% |
| Fortnite | 1080p, Competitivo | 110 | 144 | +31% |
| Red Dead Redemption 2 | 1080p, Alto | 38 | 52 | +37% |

📌 **Equipo de prueba:** AMD Athlon 320GE (Radeon Vega Graphics integrada), NVIDIA GeForce GT 710, 7,9 GB RAM, SSD 222,8 GB, Windows 10 IoT Enterprise LTSC 2021.

---

## 👥 Equipo

| Nombre | Rol | GitHub |
|--------|-----|--------|
| Máximo Uziel Seijo | Líder de Proyecto | [@ImMinato](https://github.com/ImMinato) |
| Micaias Ángel Juárez | Integrante del equipo | — |
| Ian Nazareno Noblega | Integrante del equipo | — |
| Santiago Luna | Desarrollador web / colaborador | [@MauroKpoxD](https://github.com/MauroKpoxD) |

### Mentor del proyecto

⭐ **Javier Núñez** — Ingeniero en Sistemas, profesor a cargo de la materia Laboratorio de Hardware. Su supervisión técnica fue clave para validar las decisiones de diseño y los criterios de prueba sobre hardware real.

---

## 📄 Licencia

NexusOptimizer es un producto de pago único. El código fuente es privado y no está disponible para redistribución sin autorización.

---

## 🙏 Agradecimientos

- A nuestro mentor, el profesor Javier Núñez, por su guía y apoyo constante durante todo el proyecto.
- A la Escuela de Educación Secundaria Técnica N° 1 "República del Paraguay" por brindarnos el espacio para desarrollar este proyecto.
- A todos los beta testers que nos ayudaron a pulir cada detalle.

<div align="center">
  <p>Hecho con ❤️ por el equipo de NexusOptimizer</p>
  <p><strong>Feria de Ciencias y Tecnología 2026</strong></p>
</div>