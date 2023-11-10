function changePrioColor(prio) {
    let container = document.getElementById(prio + '_container');
    let img = document.getElementById(prio + '_img');  
    
    if (container.classList.contains('selected')) {      
      container.style.backgroundColor = 'white';
      container.style.color = '#2a3647';
      img.src = './img/' + prio + '.svg';
      container.classList.remove('selected');
    } else {      
      resetContainers();
      container.classList.add('selected');  
      
      let color;
      if (prio === 'urgent') {
        color = '#ff3d00';
      } else if (prio === 'medium') {
        color = '#ffa800';
      } else if (prio === 'low') {
        color = '#7ae229';
      }
  
      container.style.backgroundColor = color;
      container.style.color = 'white';
      img.src = './img/' + prio + '_white.svg';
    }
  }
  
  // resetting prio container 
  function resetContainers() {    
    let containers = document.querySelectorAll('.status-definition-container');
    containers.forEach((container) => {
      container.style.backgroundColor = 'white';
      container.style.color = '#2a3647';
      let img = container.querySelector('.prio-images');
      img.src = './img/' + container.id.replace('_container', '') + '.svg';
      container.classList.remove('selected');
    });
  }
  



  

