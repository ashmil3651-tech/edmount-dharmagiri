// ============================================
// CONTENT LOADER - Loads content from localStorage
// Add this to every HTML page: <script src="content-loader.js"></script>
// ============================================

(function() {
    'use strict';
    
    console.log('🔄 Content loader starting...');
    
    // Get saved content
    const saved = localStorage.getItem('edmount_content');
    if (!saved) {
        console.log('ℹ️ No saved content found. Using default HTML.');
        return;
    }
    
    try {
        const content = JSON.parse(saved);
        const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
        const data = content[page];
        
        if (!data) {
            console.log(`ℹ️ No content data for page: ${page}`);
            return;
        }
        
        console.log(`✅ Loading content for: ${page}.html`);
        
        // ============================================
        // UPDATE FUNCTIONS
        // ============================================
        function updateText(selector, value) {
            if (!value) return;
            document.querySelectorAll(selector).forEach(el => {
                el.textContent = value;
            });
        }
        
        function updateHTML(selector, value) {
            if (!value) return;
            document.querySelectorAll(selector).forEach(el => {
                el.innerHTML = value;
            });
        }
        
        function updateSrc(selector, value) {
            if (!value) return;
            document.querySelectorAll(selector).forEach(el => {
                el.src = value;
            });
        }
        
        function updateVideo(selector, value) {
            if (!value) return;
            document.querySelectorAll(selector).forEach(el => {
                el.src = value;
                el.load();
            });
        }
        
        // ============================================
        // HOME PAGE (index.html)
        // ============================================
        if (page === 'index') {
            if (data.hero) {
                updateText('.hero-badge', data.hero.badge);
                updateText('.hero-title', data.hero.title);
                updateText('.hero-sub', data.hero.subtitle);
                updateText('.hero-desc', data.hero.description);
                
                if (data.hero.button1) {
                    document.querySelectorAll('.hero-btn-1').forEach(el => el.textContent = data.hero.button1);
                }
                if (data.hero.button2) {
                    document.querySelectorAll('.hero-btn-2').forEach(el => el.textContent = data.hero.button2);
                }
            }
            if (data.programs) {
                updateText('.prog-title', data.programs.title);
                updateText('.prog-desc', data.programs.subtitle);
            }
            if (data.mission) {
                updateText('.mission-title', data.mission.title);
            }
            if (data.cta) {
                updateText('.cta-title', data.cta.title);
                updateText('.cta-desc', data.cta.description);
            }
            console.log('✅ Home page updated!');
        }
        
        // ============================================
        // ABOUT PAGE (about.html) - FIXED
        // ============================================
        if (page === 'about') {
            if (data.header) {
                updateText('.about-title', data.header.title);
                updateText('.about-subtitle', data.header.subtitle);
            }
            if (data.principal) {
                // Use innerHTML instead of textContent to preserve line breaks
                document.querySelectorAll('.principal-message').forEach(el => {
                    el.innerHTML = data.principal.message.replace(/\n/g, '<br>');
                });
                updateText('.principal-signature', data.principal.signature);
                updateText('.principal-institution', data.principal.institution);
            }
            if (data.vision) {
                updateText('.vision-text', data.vision.text);
            }
            if (data.mission) {
                updateText('.mission-text', data.mission.text);
            }
            console.log('✅ About page updated!');
        }
        
        // ============================================
        // ACADEMICS PAGE (academics.html)
        // ============================================
        if (page === 'academics') {
            if (data.header) {
                updateText('.academics-title', data.header.title);
                updateText('.academics-subtitle', data.header.subtitle);
            }
            console.log('✅ Academics page updated!');
        }
        
        // ============================================
        // FACILITIES PAGE (facilities.html)
        // ============================================
        if (page === 'facilities') {
            if (data.header) {
                updateText('.facilities-title', data.header.title);
                updateText('.facilities-subtitle', data.header.subtitle);
            }
            if (data.video) {
                document.querySelectorAll('#campusVideo source').forEach(el => {
                    el.src = data.video.src;
                });
                document.querySelectorAll('#campusVideo').forEach(el => {
                    el.load();
                });
                updateText('.video-title', data.video.title);
                updateText('.video-desc', data.video.description);
            }
            console.log('✅ Facilities page updated!');
        }
        
        // ============================================
        // ADMISSION PAGE (admission.html)
        // ============================================
        if (page === 'admission') {
            if (data.header) {
                updateText('.admission-title', data.header.title);
                updateText('.admission-subtitle', data.header.subtitle);
            }
            if (data.contact) {
                updateText('.contact-phone1', data.contact.phone1);
                updateText('.contact-phone2', data.contact.phone2);
                updateText('.contact-email', data.contact.email);
                updateText('.contact-address', data.contact.address);
            }
            console.log('✅ Admission page updated!');
        }
        
        console.log('✅ All content loaded successfully!');
        
    } catch(e) {
        console.log('❌ Error loading content:', e.message);
    }
})();