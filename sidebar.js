document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .custom-sidebar-toggle {
            position: fixed;
            top: 1.5rem;
            right: 1.5rem;
            z-index: 30;
            width: 3rem;
            height: 3rem;
            border-radius: 1rem;
            background-color: rgba(255, 255, 255, 0.95);
            color: #334155;
            border: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        .custom-sidebar-toggle:hover {
            background-color: #ffffff;
            color: #2563eb;
        }
        .custom-sidebar-toggle:active {
            transform: scale(0.95);
        }
        .custom-sidebar-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(4px);
            z-index: 40;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        .custom-sidebar-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }
        .custom-sidebar {
            position: fixed;
            top: 0;
            right: 0;
            height: 100%;
            width: 20rem;
            background-color: #ffffff;
            color: #1e293b;
            z-index: 50;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;
            box-shadow: -10px 0 25px -5px rgba(0, 0, 0, 0.1);
            border-left: 1px solid #e2e8f0;
        }
        .custom-sidebar.active {
            transform: translateX(0);
        }
        .custom-sidebar-header {
            padding: 1.25rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #f1f5f9;
        }
        .custom-sidebar-brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .custom-sidebar-logo {
            width: 2.25rem;
            height: 2.25rem;
            border-radius: 0.75rem;
            background-color: #2563eb;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .custom-sidebar-logo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .custom-sidebar-title-box h2 {
            font-weight: 900;
            font-size: 1rem;
            color: #1e293b;
            display: flex;
            align-items: center;
            gap: 0.375rem;
            margin: 0;
        }
        .custom-sidebar-badge {
            font-size: 0.75rem;
            background-color: #dbeafe;
            color: #2563eb;
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-weight: 700;
        }
        .custom-sidebar-status {
            display: flex;
            align-items: center;
            gap: 0.375rem;
            margin-top: 0.125rem;
        }
        .custom-sidebar-status-dot {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background-color: #10b981;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        .custom-sidebar-status-text {
            font-size: 0.6875rem;
            color: #94a3b8;
            font-weight: 500;
        }
        .custom-sidebar-close {
            width: 2rem;
            height: 2rem;
            border-radius: 0.75rem;
            background-color: #f1f5f9;
            border: none;
            color: #64748b;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .custom-sidebar-close:hover {
            background-color: #e2e8f0;
            color: #1e293b;
        }
        .custom-sidebar-body {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .custom-sidebar-section-title {
            font-size: 0.6875rem;
            font-weight: 700;
            color: #94a3b8;
            letter-spacing: 0.05em;
            padding: 0 0.75rem;
            margin-bottom: 0.5rem;
            display: block;
        }
        .custom-sidebar-links {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
        .custom-sidebar-link {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.625rem 0.75rem;
            border-radius: 0.75rem;
            font-size: 0.875rem;
            text-decoration: none;
            transition: all 0.2s ease;
        }
        .custom-sidebar-link.active {
            background-color: #eff6ff;
            color: #2563eb;
            font-weight: 700;
            border: 1px solid #bfdbfe;
        }
        .custom-sidebar-link.inactive {
            color: #475569;
            font-weight: 500;
        }
        .custom-sidebar-link.inactive:hover {
            color: #0f172a;
            background-color: #f8fafc;
        }
        .custom-sidebar-link i {
            width: 1.25rem;
            text-align: center;
        }
        .custom-sidebar-link.active i {
            color: #2563eb;
        }
        .custom-sidebar-link.inactive i {
            color: #94a3b8;
        }
        .custom-sidebar-footer {
            padding: 1rem;
            border-top: 1px solid #f1f5f9;
            text-align: center;
        }
        .custom-sidebar-footer p {
            font-size: 0.75rem;
            color: #94a3b8;
            font-weight: 500;
            margin: 0;
        }
    `;
    document.head.appendChild(styleElement);

    const sidebarHTML = `
    <button onclick="toggleSidebar()" class="custom-sidebar-toggle">
        <i class="fa-solid fa-bars" style="font-size: 1.25rem;"></i>
    </button>

    <div id="sidebar-overlay" onclick="toggleSidebar()" class="custom-sidebar-overlay"></div>

    <aside id="sidebar" class="custom-sidebar">
        <div class="custom-sidebar-header">
            <div class="custom-sidebar-brand">
                <div class="custom-sidebar-logo">
                    <img src="1.png" alt="Logo">
                </div>
                <div class="custom-sidebar-title-box">
                    <h2>
                        AlaaDev <span class="custom-sidebar-badge">Hub</span>
                    </h2>
                    <div class="custom-sidebar-status">
                        <span class="custom-sidebar-status-dot"></span>
                        <span class="custom-sidebar-status-text">Available</span>
                    </div>
                </div>
            </div>
            <button onclick="toggleSidebar()" class="custom-sidebar-close">
                <i class="fa-solid fa-xmark" style="font-size: 0.875rem;"></i>
            </button>
        </div>

        <div class="custom-sidebar-body">
            <div>
                <span class="custom-sidebar-section-title">الرئيسية</span>
                <div class="custom-sidebar-links">
                    <a href="index.html" class="custom-sidebar-link ${currentPath === 'index.html' || currentPath === '' ? 'active' : 'inactive'}">
                        <i class="fa-solid fa-house"></i>
                        <span>الصفحة الرئيسية</span>
                    </a>
                    <a href="contact.html" class="custom-sidebar-link ${currentPath === 'contact.html' ? 'active' : 'inactive'}">
                        <i class="fa-solid fa-envelope"></i>
                        <span>التواصل</span>
                    </a>
                    <a href="community.html" class="custom-sidebar-link ${currentPath === 'community.html' ? 'active' : 'inactive'}">
                        <i class="fa-solid fa-users"></i>
                        <span>المجتمع</span>
                    </a>
                </div>
            </div>

            <div>
                <span class="custom-sidebar-section-title">المحتوى والأقسام</span>
                <div class="custom-sidebar-links">
                    <a href="events.html" class="custom-sidebar-link ${currentPath === 'events.html' ? 'active' : 'inactive'}">
                        <i class="fa-solid fa-calendar-days"></i>
                        <span>فعاليات</span>
                    </a>
                    <a href="theater.html" class="custom-sidebar-link ${currentPath === 'theater.html' ? 'active' : 'inactive'}">
                        <i class="fa-solid fa-masks-theater"></i>
                        <span>مسرح</span>
                    </a>
                    <a href="addons.html" class="custom-sidebar-link ${currentPath === 'addons.html' ? 'active' : 'inactive'}">
                        <i class="fa-solid fa-puzzle-piece"></i>
                        <span>الإضافات</span>
                    </a>
                </div>
            </div>
        </div>

        <div class="custom-sidebar-footer">
            <p>&copy; 2026 AlaaDev. All rights reserved.</p>
        </div>
    </aside>
    `;

    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!sidebar || !overlay) return;

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

