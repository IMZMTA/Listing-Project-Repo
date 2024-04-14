// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })();

  // toogle addEventListener
  let priceToggle = document.getElementById("flexSwitchCheckDefault");
  priceToggle.addEventListener("click", ()=>{
      let hiddenInfo = document.getElementsByClassName("hidden");
      for(info of hiddenInfo){
          if(info.style.display != "inline"){
              info.style.display = "inline";
          }else{
              info.style.display = "none";
          }
      };
  });

