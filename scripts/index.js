function donut() {  

    var R1 = 1;
    var R2 = 2;
    var K2 = 5;
    var K1 = 30;

    var A = 1;
    var B = 1;

    function render_donut() {
        if(!runDonut){
            return;
        }

        var output = [];
        var zBuffer = [];

        //precomputing
        var sinA = Math.sin(A);
        var cosA = Math.cos(A);
        var sinB = Math.sin(B);
        var cosB = Math.cos(B);

        for (var i=0; i<1760; i++)
        {
            if (i%80==79){
                output[i] = "\n";
            }
            else{
                output[i] = " ";
            }
            zBuffer[i] = 0;
        }

        for (var theta=0; theta<2*Math.PI; theta+=0.07)
        {
            //precomputing
            var cosTheta = Math.cos(theta);
            var sinTheta = Math.sin(theta);

            for (var phi=0; phi<2*Math.PI; phi+=0.02)
            {
                //precomputing
                var cosPhi = Math.cos(phi);
                var sinPhi = Math.sin(phi);

                //x,y coordinate of the circle
                var circleX = R2 + R1*cosTheta;
                var circleY = R1*sinTheta;

                // final x,y,z coordinate after rotation
                var x = circleX*(cosB*cosPhi + sinA*sinB*sinPhi) - circleY*cosA*sinB;
                var y = circleX*(cosPhi*sinB - cosB*sinA*sinPhi) + circleY*cosA*cosB;
                var z = K2 + cosA*circleX*sinPhi + circleY*sinA;
                var ooz = 1/z;

                var xProj = Math.floor(40 + K1*x/(K2+z));
                var yProj = Math.floor(11 + K1*y/(K2+z));
        
                var luminance = cosPhi*cosTheta*sinB - cosA*cosTheta*sinPhi - sinA*sinTheta + cosB*(cosA*sinTheta - cosTheta*sinA*sinPhi);

                var o = xProj+80*yProj;
                
                if (luminance>0 && yProj<22 && yProj>=0 && xProj>=0 && xProj<79 && ooz>zBuffer[o])
                {
                    zBuffer[o] = ooz;
                    var luminanceIndex = luminance*8;
                    output[o] = ".,-~:;=!*#$@".charAt(luminanceIndex);           
                }
            }
        }
        if(!runDonut)
        {
            return;
        }

        $("#screen").html(output.join(""));
        A+=0.05*(rotSpeed);
        B+=0.03*(rotSpeed);
    }
    setInterval(render_donut, 20);
}


function cube() {

    var K1 = 10;
    var K2 = 50;

    var A = 1;
    var B = 1;
    var C = 1;

    var cubeWidth = 20;

    function render_cube() {
        if(!runCube){
            return;
        }

        var output = [];
        var zBuffer = [];

        for (var i=0; i<1760; i++)
        {
            if (i%80==79){
                output[i] = "\n";
            }
            else{
                output[i] = " ";
            }
            zBuffer[i] = 0;
        }

        //precomputing
        var sinA = Math.sin(A);
        var cosA = Math.cos(A);
        var sinB = Math.sin(B);
        var cosB = Math.cos(B);
        var sinC = Math.sin(C);
        var cosC = Math.cos(C);

        function calculateX(i,j,k) {
            return j*sinA*sinB*cosC - k*cosA*sinB*cosC + j*cosA*sinC + k*sinA*sinC + i*cosB*cosC;
        }
        
        function calculateY(i,j,k) {
            return j*cosA*cosC + k*sinA*cosC - j*sinA*sinB*sinC + k*cosA*sinB*sinC - i*cosB*sinC;
        }

        function calculateZ(i,j,k) {
            return k*cosA*cosB - j*sinA*cosB + i*sinB;
        }

        function calculateSurface(cubeX, cubeY, cubeZ, char){
            var x = calculateX(cubeX, cubeY, cubeZ);
            var y = calculateY(cubeX, cubeY, cubeZ);
            var z = calculateZ(cubeX, cubeY, cubeZ) + K2;

            var ooz = 1/z;
            
            var xProj = Math.floor(40 + K1*ooz*x*2);
            var yProj = Math.floor(11 + K1*ooz*y);
        
            var o = xProj+80*yProj;

            if (yProj<22 && yProj>=0 && xProj>=0 && xProj<79 && ooz>zBuffer[o])
            {
                zBuffer[o] = ooz;
                output[o] = char;
            }
        }

        for (var cubeX = -cubeWidth; cubeX<cubeWidth; cubeX += 0.5)
        {
            for (var cubeY = -cubeWidth; cubeY<cubeWidth; cubeY += 0.5)
            {
                calculateSurface(cubeX, cubeY, -cubeWidth, "@");
                calculateSurface(cubeWidth, cubeY, cubeX, "$");
                calculateSurface(-cubeWidth, cubeY, -cubeX, "~");
                calculateSurface(-cubeX, cubeY, cubeWidth, "#");
                calculateSurface(cubeX, -cubeWidth, -cubeY, ";");
                calculateSurface(cubeX, cubeWidth, cubeY, "+");
            }
        }
        
        $("#screen").html(output.join(""));
        A+=0.05*(rotSpeed);
        B+=0.03*(rotSpeed);
        C+=0.03*(rotSpeed);
    }
    setInterval(render_cube, 20);
}


function complex_cube() {

    var K1 = 10;
    var K2 = 50;

    //outer cube
    var A1 = 1;
    var B1 = 1;
    var C1 = 1;

    //inner cube
    var A2 = 1;
    var B2 = 1;
    var C2 = 1;

    var cubeWidthOuter = 22;
    var cubeWidthInner = 15;

    function render_complex_cube() {
        if(!runComplexCube){
            return;
        }

        var output = [];
        var zBuffer = [];

        for (var i=0; i<1760; i++)
        {
            if (i%80==79){
                output[i] = "\n";
            }
            else{
                output[i] = " ";
            }
            zBuffer[i] = 0;
        }

        //precomputing for outer cube
        var sinA = Math.sin(A1);
        var cosA = Math.cos(A1);
        var sinB = Math.sin(B1);
        var cosB = Math.cos(B1);
        var sinC = Math.sin(C1);
        var cosC = Math.cos(C1);

        function calculateX(i,j,k) {
            return j*sinA*sinB*cosC - k*cosA*sinB*cosC + j*cosA*sinC + k*sinA*sinC + i*cosB*cosC;
        }
        
        function calculateY(i,j,k) {
            return j*cosA*cosC + k*sinA*cosC - j*sinA*sinB*sinC + k*cosA*sinB*sinC - i*cosB*sinC;
        }

        function calculateZ(i,j,k) {
            return k*cosA*cosB - j*sinA*cosB + i*sinB;
        }

        function calculateSurface(cubeX, cubeY, cubeZ, char){
            var x = calculateX(cubeX, cubeY, cubeZ);
            var y = calculateY(cubeX, cubeY, cubeZ);
            var z = calculateZ(cubeX, cubeY, cubeZ) + K2;

            var ooz = 1/z;
            
            var xProj = Math.floor(40 + K1*ooz*x*2);
            var yProj = Math.floor(11 + K1*ooz*y);
        
            var o = xProj+80*yProj;

            if (yProj<22 && yProj>=0 && xProj>=0 && xProj<79 && ooz>zBuffer[o])
            {
                zBuffer[o] = ooz;
                output[o] = char;
            }
        }

        for (var cubeX = -cubeWidthOuter; cubeX<cubeWidthOuter; cubeX += 0.5)
        {
            for (var cubeY = -cubeWidthOuter; cubeY<cubeWidthOuter; cubeY += 0.5)
            {
                calculateSurface(cubeX, cubeWidthOuter, cubeWidthOuter, "+");
                calculateSurface(cubeY, -cubeWidthOuter, cubeWidthOuter, "+");
                calculateSurface(cubeWidthOuter, cubeX, cubeWidthOuter, "+");
                calculateSurface(-cubeWidthOuter, cubeY, cubeWidthOuter, "+");

                calculateSurface(cubeX, cubeWidthOuter, -cubeWidthOuter, "-");
                calculateSurface(cubeY, -cubeWidthOuter, -cubeWidthOuter, "-");
                calculateSurface(cubeWidthOuter, cubeX, -cubeWidthOuter, "-");
                calculateSurface(-cubeWidthOuter, cubeY, -cubeWidthOuter, "-");

                calculateSurface(cubeWidthOuter, cubeWidthOuter, cubeX, ".");
                calculateSurface(-cubeWidthOuter, cubeWidthOuter, cubeY, ".");
                calculateSurface(cubeWidthOuter, -cubeWidthOuter, cubeX, ".");
                calculateSurface(-cubeWidthOuter, -cubeWidthOuter, cubeY, ".");
            }
        }

        //changing values for inner cube
        sinA = Math.sin(A2);
        cosA = Math.cos(A2);
        sinB = Math.sin(B2);
        cosB = Math.cos(B2);
        sinC = Math.sin(C2);
        cosC = Math.cos(C2);

        for (var cubeX = -cubeWidthInner; cubeX<cubeWidthInner; cubeX += 0.5)
        {
            for (var cubeY = -cubeWidthInner; cubeY<cubeWidthInner; cubeY += 0.5)
            {
                calculateSurface(cubeX, cubeY, -cubeWidthInner, "@");
                calculateSurface(cubeWidthInner, cubeY, cubeX, "$");
                calculateSurface(-cubeWidthInner, cubeY, -cubeX, "~");
                calculateSurface(-cubeX, cubeY, cubeWidthInner, "#");
                calculateSurface(cubeX, -cubeWidthInner, -cubeY, ";");
                calculateSurface(cubeX, cubeWidthInner, cubeY, "+");
            }
        }
        
        $("#screen").html(output.join(""));

        A1+=0.05*(rotSpeed);
        B1+=0.03*(rotSpeed);
        C1+=0.03*(rotSpeed);

        A2+=0.04*(rotSpeed);
        B2+=0.05*(rotSpeed);
        C2+=0.02*(rotSpeed);
    }
    setInterval(render_complex_cube, 20);
}



var runDonut = true;
var runCube = false;
var runComplexCube = false;

document.getElementById("donut").checked = true;
donut();
cube();
complex_cube();

$("#buttons").on("input", function() {

    if (document.getElementById("donut").checked){
        runCube = false;
        runComplexCube = false;
        runDonut = true;
    }
    else if (document.getElementById("cube").checked){
        runComplexCube = false;
        runDonut = false;
        runCube = true;
    }
    else if (document.getElementById("complex-cube").checked){
        runDonut = false;
        runCube = false;
        runComplexCube = true;
    }
  
});



var rotSpeed = 1;

$("#slide-input").on("input", function() {

    var multiplier = document.getElementById("slide-input").value;

    //multiplier range: 0.1 - 6
    if(multiplier<=50){
        multiplier = (multiplier)/(50/0.9) + 0.1;
    } else {
        multiplier = (multiplier-50)/(50/5) + 1;
    }

    rotSpeed = multiplier;

});



$("#pause-btn-input").on("click", function() {

    if (rotSpeed!==0){
        rotSpeed = 0;
        $("#pause-btn-input").html("Play");
    }
    else {
        var multiplier = document.getElementById("slide-input").value;
        if(multiplier<=50){
            multiplier = (multiplier)/(50/0.9) + 0.1;
        } else {
            multiplier = (multiplier-50)/(50/5) + 1;
        }
        rotSpeed = multiplier;
        $("#pause-btn-input").html("Stop");
    }

});



$("#dark-mode-switch").on("input", function() {

    if ($("html").attr("data-bs-theme")==="light"){
        $("html").attr("data-bs-theme", "dark");
    }
    else {
        $("html").attr("data-bs-theme", "light");
    }

});


