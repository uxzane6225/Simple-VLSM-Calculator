let firstOctet = 0;
let secondOctet = 0;
let thirdOctet = 0;
let forthOctet = 0;
let ip = [firstOctet, secondOctet, thirdOctet, forthOctet];
let subnetMask = 0;
let host = 0;

let sequence = 1;
//let sequence1 = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
let sequence2 = [128, 64, 32, 16, 8, 4, 2, 1];
let bits = 0;
let nsm = 0;

let firstLSM = 0;
let secondLSM = 0;
let thirdLSM = 0;
let forthLSM = 0;
let lsm = 0;

let increment = 0;
let firstIP = 0;
let secondIP = 0;
let nextIP = 0;

let newfirstOctet = 0;
let newsecondOctet = 0;
let newthirdOctet = 0;
let newforthOctet = 0;


document.getElementById("submit").onclick = function() {
    firstOctet = document.getElementById("1stOctet").value;
    secondOctet = document.getElementById("2ndOctet").value;
    thirdOctet = document.getElementById("3rdOctet").value;
    forthOctet = document.getElementById("4thOctet").value;
    subnetMask = document.getElementById("subnetMask").value;
    host = document.getElementById("host").value;

    nsm = getNSM(sequence, host);
    lsm = getLSM(nsm);
    nextIP = getNextIP(nsm, increment);
    secondIP = getRange();

    document.getElementById("ipResult").textContent =`IP Address: ${firstOctet}.${secondOctet}.${thirdOctet}.${forthOctet} /${subnetMask}`;
    document.getElementById("hostResult").textContent = `Host: ${host}`;
    document.getElementById("bits").textContent = `Bits: ${bits}`;
    document.getElementById("nsm").textContent = `New Subnet Mask: /${nsm}`;
    document.getElementById("lsm").textContent = `Long Subnet Mask: ${lsm}`;
    document.getElementById("inc").textContent = `Increment: ${increment}`;
    document.getElementById("1stRange").textContent = `Range: ${firstIP} - ${secondIP}`;
    document.getElementById("nextIP").textContent = `Next IP: ${nextIP}`;
}

document.getElementById("clear").onclick = function() {
    firstOctet = 0;
    secondOctet = 0;
    thirdOctet = 0;
    forthOctet = 0;
    subnetMask = 0;
    host = 0;

    bits = 0;
    nsm = 0;

    firstLSM = 0;
    secondLSM = 0;
    thirdLSM = 0;
    forthLSM = 0;
    fullLSM = 0;

    increment = 0;

    firstIP = 0;
    secondIP = 0;
    nextIP = 0;

    document.getElementById("ipResult").textContent =`IP Address:`;
    document.getElementById("hostResult").textContent = `Host:`;
    document.getElementById("bits").textContent = `Bits:`;
    document.getElementById("nsm").textContent = `New Subnet Mask:`;
    document.getElementById("lsm").textContent = `Long Subnet Mask:`;
    document.getElementById("inc").textContent = `Increment:`;
    document.getElementById("1stRange").textContent = `Range:`;
    document.getElementById("nextIP").textContent = `Next IP:`;
}

function getNSM(sequence, host) {
    while (sequence < host) {
        sequence *= 2;
        bits++;
    }
    
    return 32 - bits;
}

function getLSM(nsm) {
    firstLSM = getOctet(firstLSM, nsm);
    nsm -=8;
    console.log(firstLSM);
    console.log(nsm);

    secondLSM = getOctet(secondLSM, nsm);
    nsm -=8;
    console.log(secondLSM);
    console.log(nsm);

    thirdLSM = getOctet(thirdLSM, nsm);
    nsm -=8;
    console.log(thirdLSM, nsm);
    console.log(nsm);

    forthLSM = getOctet(forthLSM, nsm);
    nsm -=8;
    console.log(forthLSM);
    console.log(nsm);


    /*if (nsm > 8) {
        for (let i = 0; i < sequence2.length; i++) {
            firstLSM += sequence2[i];
            increment = sequence2[i];
        }
    }
    else {
        for (let i = 0; i < nsm; i++) {
            if (i < nsm) {
                firstLSM += sequence2[i];
                increment = sequence2[i];
            }
        }
    }
    nsm -=8;
    console.log(firstLSM);
    console.log(nsm);

    if (nsm > 8) {
        for (let i = 0; i < sequence2.length; i++) {
            secondLSM += sequence2[i];
            increment = sequence2[i];
        }
    }
    else {
        for (let i = 0; i < nsm; i++) {
            if (i < nsm) {
                secondLSM += sequence2[i];
                increment = sequence2[i];
            }
        }
    }
    nsm -= 8;
    console.log(secondLSM);
    console.log(nsm);

    if (nsm > 8) {
        for (let i = 0; i < sequence2.length; i++) {
            thirdLSM += sequence2[i];
            increment = sequence2[i];
        }
    }
    else {
        for (let i = 0; i < nsm; i++) {
            if (i < nsm) {
                thirdLSM += sequence2[i];
                increment = sequence2[i];
            }
        }
    }
    nsm -= 8;
    console.log(thirdLSM);
    console.log(nsm);
    
    if (nsm > 8) {
        for (let i = 0; i < sequence2.length; i++) {
            forthLSM += sequence2[i];
            increment = sequence2[i];
        }
    }
    else {
        for (let i = 0; i < nsm; i++) {
            if (i < nsm) {
                forthLSM += sequence2[i];
                increment = sequence2[i];
            }
        }
    }
    nsm -= 8;
    console.log(forthLSM);
    console.log(nsm);*/

    return `${firstLSM}.${secondLSM}.${thirdLSM}.${forthLSM}`
}

function getOctet(octet, nsm) {
    if (nsm > 8) {
        for (let i = 0; i < sequence2.length; i++) {
            octet += sequence2[i];
            increment = sequence2[i];
        }
        return octet;
    }
    else {
        for (let i = 0; i < nsm; i++) {
            if (i < nsm) {
                octet += sequence2[i];
                increment = sequence2[i];
            }
        }
        return octet;
    }
}

function getNextIP(nsm, increment) {
    newfirstOctet = Number(firstOctet);
    newsecondOctet = Number(secondOctet);
    newthirdOctet = Number(thirdOctet);
    newforthOctet = Number(forthOctet);

    if (firstLSM < 255) {
        newfirstOctet += increment;
    }
    else if (secondLSM < 255) {
        newsecondOctet += increment;
    }
    else if (thirdLSM < 255) {
        newthirdOctet += increment;
    }
    else if (forthLSM < 255) {
        newforthOctet += increment;
    }
   return `${newfirstOctet}.${newsecondOctet}.${newthirdOctet}.${newforthOctet}`;
}

function getRange() {
    let firstUsable = firstOctet;
    let secondUsable = secondOctet;
    let thirdUsable = thirdOctet;
    let forthUsable = forthOctet;

    firstIP = `${firstOctet}.${secondOctet}.${thirdOctet}.${forthOctet}`;

    if (nsm > 24) {
        forthUsable = newforthOctet - 1;
    }
    else if (nsm > 16) {
        if (newforthOctet == 0) {
            thirdUsable = newthirdOctet - 1;
            forthUsable = 255;
        }
    }
    else if (nsm > 8) {
        if (newthirdOctet == 0) {
            secondUsable = newsecondOctet - 1;
            thirdUsable = 255;
        }

        if (newforthOctet == 0) {
            forthUsable = 255;
        }
    }
    else if (nsm > 0) {
        
        if (newsecondOctet == 0) {
            firstUsable = newfirstOctet - 1;
            secondUsable = 225
        }

        if (newthirdOctet == 0) {
            thirdUsable = 255;
        }

        if (newforthOctet == 0) {
            forthUsable = 255;
        }
    }

    /*if (newsecondOctet < 1) {
        firstUsable = newfirstOctet - 1;
        secondUsable = 255;
        thirdUsable = 255;
        forthUsable = 255;
    }
    else if (newthirdOctet < 1 && forthOctet > 1) {
        secondUsable = newsecondOctet - 1;
        thirdUsable = 255;
        forthUsable = 255;
    }
    else if (newforthOctet < 1) {
        thirdUsable = newthirdOctet - 1;
        forthUsable = 255;
    }*/

    return `${firstUsable}.${secondUsable}.${thirdUsable}.${forthUsable}`;



    /*if (nsm > 24) {
        newforthOctet += increment;
        firstIP = `${firstOctet}.${secondOctet}.${thirdOctet}.${forthOctet}`;
        secondIP = `${newfirstOctet}.${newsecondOctet}.${newthirdOctet}.${newforthOctet-1}`;
        return `${newfirstOctet}.${newsecondOctet}.${newthirdOctet}.${newforthOctet}`;
    }
    else if (nsm > 16) {
        newthirdOctet += increment;
        firstIP = `${firstOctet}.${secondOctet}.${thirdOctet}.${forthOctet} /${nsm}`;
        if (newforthOctet > 0) {
            secondIP = `${newfirstOctet}.${newsecondOctet}.${newthirdOctet-1}.${newforthOctet-1}`;
        }
        else {
            
        }
        secondIP = `${newfirstOctet}.${newsecondOctet}.${newthirdOctet-1}.${newforthOctet = 255}`;
        return `${newfirstOctet}.${newsecondOctet}.${newthirdOctet}.${newforthOctet}`;
    }
    else if (nsm > 8) {
        newsecondOctet += increment;
        firstIP = `${firstOctet}.${secondOctet}.${thirdOctet}.${forthOctet}`;
        secondIP = `${newfirstOctet}.${newsecondOctet-1}.${newthirdOctet}.${newforthOctet}`;
        return `${newfirstOctet}.${newsecondOctet}.${newthirdOctet}.${newforthOctet}`;
    }
    else if (nsm > 0) {
        newfirstOctet += increment;
        firstIP = `${firstOctet}.${secondOctet}.${thirdOctet}.${forthOctet}`;
        secondIP = `${newfirstOctet-1}.${newsecondOctet = 255}.${newthirdOctet = 255}.${newforthOctet = 255}`;
        return `${newfirstOctet}.${newsecondOctet}.${newthirdOctet}.${newforthOctet}`;
    }
    else {
        console.log("idk");
        return `${newfirstOctet}.${newsecondOctet}.${newthirdOctet}.${newforthOctet}`;
    }*/
}