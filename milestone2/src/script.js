const panels = document.querySelectorAll(".panel")
const pannel_wrappers = document.querySelectorAll(".panel-wrapper")

panels.forEach((panel, i) => {
    if(i % 2 == 1) {
        panel.style.background= "lightblue";
    }
})

pannel_wrappers.forEach((pannel_wrapper, i) => {
    pannel_wrapper.style.marginTop = `${i * 100}vh`
})
