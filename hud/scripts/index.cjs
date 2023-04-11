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
    value = borderLen - borderLen * (value / 100);

    function updateProgressBar()
    {
        if (anim[progressid] == undefined)
            return;
        
        offset -= speed;
        if (offset <= value)
        {
            progress.style.strokeDashoffset = value;
            return window.cancelAnimationFrame(anim[progressid]);
        }
        
        progress.style.strokeDashoffset = offset;
        anim[progressid] = window.requestAnimationFrame(updateProgressBar);
    }

    anim[progressid] = window.requestAnimationFrame(updateProgressBar);
};
