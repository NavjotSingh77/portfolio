const glow=document.querySelector('.cursor-glow');
document.querySelector('.skill-grid img[src*="amazonaws"]')?.setAttribute('src','assets/aws-cloud.svg');
window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:0,transform:'translateY(35px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,fill:'forwards',easing:'cubic-bezier(.2,.75,.25,1)'});reveal.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.project,.roles article,.certs li,.statement-copy,.repo-grid a,.skill-grid div').forEach(el=>{el.style.opacity='0';reveal.observe(el)});

const intro=document.querySelector('.intro-overlay'), canvas=document.querySelector('#neural-intro'), ctx=canvas.getContext('2d');
let particles=[], frame, finished=false;
function size(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}
function setup(){size();const count=Math.min(100,Math.round(innerWidth/14));particles=Array.from({length:count},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.32,vy:(Math.random()-.5)*.32,r:Math.random()*1.6+.5,phase:Math.random()*Math.PI*2}))}
function draw(t){if(finished)return;ctx.fillStyle='#08090c';ctx.fillRect(0,0,innerWidth,innerHeight);for(const p of particles){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;for(const q of particles){const dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);if(d>0&&d<130){ctx.strokeStyle=`rgba(150,125,255,${.19*(1-d/130)})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}ctx.fillStyle=`rgba(200,247,122,${.55+.4*Math.sin(t*.003+p.phase)})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}frame=requestAnimationFrame(draw)}
function closeIntro(){if(finished)return;finished=true;cancelAnimationFrame(frame);intro.classList.add('is-done');setTimeout(()=>intro.remove(),900)}
document.querySelector('.skip-intro').addEventListener('click',closeIntro);window.addEventListener('resize',setup);setup();
if(matchMedia('(prefers-reduced-motion: reduce)').matches)closeIntro();else{frame=requestAnimationFrame(draw);setTimeout(closeIntro,3600)}
