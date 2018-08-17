// handle key events for hidden checkboxes and radio buttons
document.addEventListener('keydown', function(e) {
  let activeEl = document.activeElement;
  let classList = activeEl.classList || []; 
  
  if (classList.contains('radio-group') || classList.contains('checkbox-group')) {
    let key = e.key || e.keyCode;

    if (key === ' ') {
      e.preventDefault();
      activeEl.querySelector('input').click();
      // activeEl.focus();
    } 
  }
}, false);

// scroll .input-group elements into middle of screen
// if they're partially obscured on focus
document.addEventListener('focus', function(e) {
  if (!e.target.closest) return;
  
  let inputGroup = e.target.closest('.input-group');
  
  if (!inputGroup) return; // bail if the focused element is not a descendant of an .input-group element
  
  if (!isFullyVisible(inputGroup)) {
    let rect = inputGroup.getBoundingClientRect();
    let scrollTarget = window.scrollY + rect.top - ((window.innerHeight - rect.height) / 2);
    
    if (scrollTarget > 0) {
      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      });
    }
  }
}, true);


function isFullyVisible(element) {
  let rect = element.getBoundingClientRect();
  
  if (rect.top > 0 && 
      rect.left > 0 && 
      rect.bottom < window.innerHeight && 
      rect.right < window.innerWidth) {
    return true;
  }
  
  return false;
}