document.addEventListener('deviceready', function() {    

    // self executing function here
    (function() {
        // your page initialization code here
        // the DOM will be available here    

        var first = true,
            colors = new Array('e78faa', '85ced4', '898edb', 'f0d082', 'f6eeb9'),
            rangeColors = new Array('FFDF00', 'FFDF00', 'FFA500', 'FFA500', 'FF8C00', 'FF8C00', '00FA9A', 'ADFF2F', '9ACD32', '32CD32'),
            letters = new Array(
                {'letter': 'a', 'sfx': 'aMinus'},
                {'letter': 'e', 'sfx': 'eMinus'},
                {'letter': 'i', 'sfx': 'iMinus'},
                {'letter': 'o', 'sfx': 'oMinus'},
                {'letter': 'u', 'sfx': 'uMinus'},
                {'letter': 'A', 'sfx': 'aMayus'},
                {'letter': 'E', 'sfx': 'eMayus'},
                {'letter': 'I', 'sfx': 'iMayus'},
                {'letter': 'O', 'sfx': 'oMayus'},
                {'letter': 'U', 'sfx': 'uMayus'}
            ),
            range = 0,
            lettersLen = letters.length,
            wallpapers = new Array('donuts', 'food', 'hotdogs', 'nachos'),
            seleccionaSfx = document.getElementById('selecciona'),
            yaySfx = document.getElementById('yay'),
            wellDoneSfx = document.getElementById('wellDone'),
            noSfx = document.getElementById('noSfx'),
            meow0 = document.getElementById('meow0'),
            meow1 = document.getElementById('meow1'),
            meow2 = document.getElementById('meow2'),
            meow3 = document.getElementById('meow3'),
            star0 = document.getElementById('star0'),
            okSfx = document.getElementById('ok'), 
            errorSfx = document.getElementById('error'),
            randomLetters, theOne, sfxLetter, timeout,
            wallpaper,
            win = false;        

        document.getElementById('opt0').addEventListener('click', function() {selectOpt(0);});
        document.getElementById('opt1').addEventListener('click', function() {selectOpt(1);});
        document.getElementById('opt2').addEventListener('click', function() {selectOpt(2);});
        document.getElementById('opt3').addEventListener('click', function() {selectOpt(3);});
        document.getElementById('catOk0').addEventListener('click', function() {meow0.play();});
        document.getElementById('catOk1').addEventListener('click', function() {meow1.play();});
        document.getElementById('catOk2').addEventListener('click', function() {meow2.play();});
        document.getElementById('catOk3').addEventListener('click', function() {meow3.play();});
        document.getElementById('catOk4').addEventListener('click', function() {star0.play();});
        document.getElementById('catError').addEventListener('click', function() {noSfx.play();});
        document.getElementById('repeat').addEventListener("click", function() {
            if (win == true) {
                reboot();
            } else {
                stopSounds();
                sfxLetter.play();
            }        
        });        

        setWallpaper();
        next();        
        
        function setWallpaper() {
            document.getElementById('bodyOriginal').className = '';
            var _;
            while (true) {
                _ = wallpapers[getRandomInt(0, 4)];
                if (_ != wallpaper) {
                    wallpaper = _;
                    break;
                }
            }            
            document.getElementById('bodyOriginal').classList.add(wallpaper);
        }    

        function next() {
            enableButtons();
            
            var buttons = document.getElementsByClassName('opt');
            buttons[0].style.background = '#' + colors[Math.floor(Math.random()*5)];
            buttons[1].style.background = '#' + colors[Math.floor(Math.random()*5)];
            buttons[2].style.background = '#' + colors[Math.floor(Math.random()*5)];
            buttons[3].style.background = '#' + colors[Math.floor(Math.random()*5)];
            document.getElementById('repeat').style.background = '#' + colors[Math.floor(Math.random()*5)];        
            hideCats();
            randomLetters = getRandomLetters();        
            randomLetters.forEach(function(e, i) {
                document.getElementById('opt' + i).innerHTML = e.letter;
            });
            theOne = randomLetters[Math.floor(Math.random()*4)];
            sfxLetter = document.getElementById(theOne.sfx);
            stopSounds();
            if (first == true || getRandomInt(0, 2) == 1) {            
                first = false;
                seleccionaSfx.play();
                timeout = setTimeout(function() {            
                    sfxLetter.play();
                }, 2000);
            } else {
                sfxLetter.play();
            }
        }

        function getRandomLetters() {
            var randomLetters = new Array();
            var selecteds = new Array();
            var index;
            while (selecteds.length < 4) {
                index = Math.floor(Math.random()*lettersLen);
                if (selecteds.indexOf(index) === -1) {
                    selecteds.push(index);
                    randomLetters.push(letters[index]);
                }                        
            }   
            
            return randomLetters;
        }

        function disableButtons() {

            document.getElementById('opt0').disabled = true;
            document.getElementById('opt1').disabled = true;
            document.getElementById('opt2').disabled = true;
            document.getElementById('opt3').disabled = true;
            document.getElementById('repeat').disabled = true;
        }

        function enableButtons() {

            document.getElementById('opt0').disabled = false;
            document.getElementById('opt1').disabled = false;
            document.getElementById('opt2').disabled = false;
            document.getElementById('opt3').disabled = false;
            document.getElementById('repeat').disabled = false;
        }

        function stopSounds() {
            if (timeout != undefined) {
                clearTimeout(timeout);
            }
            stopSound(seleccionaSfx);
            stopSound(sfxLetter);
            stopSound(meow0);
            stopSound(meow1);
            stopSound(meow2);
            stopSound(meow3);
            stopSound(star0);
            stopSound(noSfx);
        }

        function stopSound(sound) {
            if (sound != undefined) { 
                sound.pause();
                sound.currentTime = 0;
            }        
        }

        function selectOpt(optIndex) {      
            
            stopSounds();
            disableButtons();

            if (win == true) {
                reboot();
                return;
            }

            if (document.getElementById('opt' + optIndex).innerHTML == theOne.letter) {            
                okSfx.play();
                showSuccessCat();
                ++range;
                var stepElem = document.getElementById('range'+range);            
                stepElem.style.background = '#' + rangeColors[range - 1];
                if (range >= 10) {
                    //yay!
                    document.getElementById('repeat').disabled = false;
                    //document.getElementById('repeat').style.display = 'none';
                    document.getElementById('catOk0').style.display = 'block';
                    document.getElementById('catOk1').style.display = 'block';
                    document.getElementById('catOk2').style.display = 'block';
                    document.getElementById('catOk3').style.display = 'block';
                    document.getElementById('catOk4').style.display = 'block';                
                    yaySfx.play();
                    //wellDoneSfx.play();
                    win = true;
                } else {
                    setTimeout(function() {                    
                        next();
                    }, 1400);            
                }            
            } else {
                if (range > 0) {                
                    document.getElementById('range' + range).style.background = '';
                    --range;
                    if (range <=0) {
                        range = 0;
                    } else {                    
                        document.getElementById('range'+range).style.background = '';
                        --range;            
                    }
                }                                    

                errorSfx.play();
                showErrorCat();

                setTimeout(function() {                
                    next();
                }, 1400);            
            }
        }    

        // Retorna un entero aleatorio entre min (incluido) y max (excluido)
        // ¡Usando Math.round() te dará una distribución no-uniforme!
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function hideCats() {
            document.getElementById('catError').style.display = 'none';
            document.getElementById('catOk0').style.display = 'none';
            document.getElementById('catOk1').style.display = 'none';
            document.getElementById('catOk2').style.display = 'none';
            document.getElementById('catOk3').style.display = 'none';
            document.getElementById('catOk4').style.display = 'none';
        }    

        function showErrorCat() {
            hideCats();
            document.getElementById('catError').style.display = 'block';
        }

        function showSuccessCat(index) {
            hideCats();        
            if (index == undefined) {
                index = getRandomInt(0, 5);
            }        
            document.getElementById('catOk' + index).style.display = 'block';
        }

        function reboot() {   
            setWallpaper();
            stopSound(wellDoneSfx);     
            hideCats();        
            document.getElementById('repeat').style.display = 'block';
            range = 0;
            document.getElementById('range1').style.background = '';
            document.getElementById('range2').style.background = '';
            document.getElementById('range3').style.background = '';
            document.getElementById('range4').style.background = '';
            document.getElementById('range5').style.background = '';
            document.getElementById('range6').style.background = '';
            document.getElementById('range7').style.background = '';
            document.getElementById('range8').style.background = '';
            document.getElementById('range9').style.background = '';
            document.getElementById('range10').style.background = '';
            win = false;
            next();
        }
    })();    
        
}, false);