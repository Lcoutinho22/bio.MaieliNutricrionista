 window.addEventListener('load', () => {
            const reveals = document.querySelectorAll('.reveal');
            const revealOnScroll = () => {
                const windowHeight = window.innerHeight;
                const elementVisible = 50;
                reveals.forEach((reveal) => {
                    const elementTop = reveal.getBoundingClientRect().top;
                    if (elementTop < windowHeight - elementVisible) {
                        reveal.classList.add('active');
                    }
                });
            };
            window.addEventListener('scroll', revealOnScroll);
            revealOnScroll();
        });

        // THEME TOGGLE
        function toggleTheme() {
            document.body.classList.toggle('light-theme');
        }

        // FAQ
        function toggleFaq(el) {
            el.classList.toggle('active');
            const icon = el.querySelector('i');
            if(el.classList.contains('active')) {
                icon.style.transform = "rotate(180deg)";
            } else {
                icon.style.transform = "rotate(0deg)";
            }
        }

        // ENVIO DO FORMULÁRIO PARA WHATSAPP
        function enviarNutri() {
            const nome = document.getElementById('clientName').value;
            const idade = document.getElementById('clientAge').value;
            const historico = document.getElementById('dietHistory').value;
            const plano = document.getElementById('planSelect').value;
            const objetivo = document.getElementById('goalSelect').value;
            const obs = document.getElementById('obsInput').value || "Nenhuma observação.";
            
            if(!nome || !idade || !objetivo) { 
                alert("Por favor, preencha Nome, Idade e Objetivo."); 
                return; 
            }
            
            const text = `*Olá Maieli! Preenchi a Anamnese no site:*%0A%0A` +
                         `👤 *Nome:* ${nome}%0A` +
                         `🎂 *Idade:* ${idade} anos%0A` +
                         `🍽️ *Histórico:* ${historico}%0A` +
                         `💎 *Interesse:* ${plano}%0A` +
                         `🎯 *Objetivo:* ${objetivo}%0A` +
                         `📝 *Obs/Alergias:* ${obs}%0A%0A` +
                         `_Gostaria de saber mais sobre a consultoria!_`;
            
            window.open(`https://wa.me/SEU_NUMERO?text=${text}`, '_blank');
        }

        function escolherPlano(plano) {
            const text = `Olá Maieli! Tenho interesse no plano *${plano}*.`;
            window.open(`https://wa.me/SEU_NUMERO?text=${text}`, '_blank');
        }

        // --- COMPARTILHAMENTO JS ---
        function toggleShareModal() {
            const modal = document.getElementById('shareModal');
            modal.classList.toggle('active');
        }

        // Fecha o modal ao clicar fora dele
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('shareModal');
            if(e.target === modal) {
                toggleShareModal();
            }
        });

        function shareSocial(network) {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            let shareUrl = '';

            switch(network) {
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${title} - ${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'instagram':
                case 'tiktok':
                case 'copy':
                    // Instagram and TikTok don't have direct web share links that work simply with URLs
                    // They usually require native apps or manual link pasting
                    // Copy to clipboard is the best fallback
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        const feedback = document.getElementById('copyFeedback');
                        feedback.style.opacity = '1';
                        setTimeout(() => {
                            feedback.style.opacity = '0';
                        }, 2000);
                    });
                    return; // Return early, don't open a window for these
            }

            if (shareUrl) {
                // Open standard share URLs in a popup
                window.open(shareUrl, 'share-popup', 'width=600,height=500');
            }
        }