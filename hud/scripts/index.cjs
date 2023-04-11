var anim = {};

function setProgressBarValue(progressid, value, speed=1)
{
    if (anim[progressid] != undefined)
        window.cancelAnimationFrame(anim[progressid]);

    var progress = document.querySelector(`#${progressid} path.path-bar`),
        borderLen = progress.getTotalLength() + 5,
        offset = borderLen;
    
    progress.style.strokeDashoffset = borderLen;
    progress.style.strokeDasharray = borderLen + ',' + borderLen;

    function updateProgressBar()
    {
        if (anim[progressid] == undefined)
            return;
        
        if (offset - speed < borderLen - borderLen * (value / 100))
        {
            offset = borderLen - borderLen * (value / 100)
        } else {
            offset -= speed;
        }

        progress.style.strokeDashoffset = offset;

        if (offset <= borderLen - borderLen * (value / 100))
            return window.cancelAnimationFrame(anim[progressid]);
        
        anim[progressid] = window.requestAnimationFrame(updateProgressBar);
    }

    anim[progressid] = window.requestAnimationFrame(updateProgressBar);
};
