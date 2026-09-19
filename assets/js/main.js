
document.addEventListener("DOMContentLoaded", () => {
  const clock = document.querySelector("[data-clock]");
  const stamp = document.querySelector("[data-last-update]");

  function updateClock(){
    const now = new Date();
    const time = new Intl.DateTimeFormat("pl-PL",{
      hour:"2-digit",minute:"2-digit",second:"2-digit"
    }).format(now);
    if(clock) clock.textContent = time;
  }
  updateClock();
  setInterval(updateClock,1000);

  if(stamp){
    stamp.textContent = new Intl.DateTimeFormat("pl-PL",{
      day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"
    }).format(new Date());
  }

  document.querySelectorAll("[data-demo-form]").forEach(form=>{
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const msg=form.querySelector(".form-msg");
      if(msg) msg.textContent="DEMO: formularz nie wysyła danych.";
      form.reset();
    });
  });

  document.querySelectorAll("[data-search-form]").forEach(form=>{
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const q=form.querySelector("input")?.value.trim();
      alert(q ? `Wyszukiwanie demo: ${q}` : "Wpisz szukaną frazę.");
    });
  });
});
