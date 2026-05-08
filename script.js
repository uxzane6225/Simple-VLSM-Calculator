let ipAddress = 0;
let firstOctet = 0;
let secondOctet = 0;
let thirdOctet = 0;
let forthOctet = 0;
let subnetMask = 0;
let host = 0;


let sequence = 1;
let sequence2 = [128, 64, 32, 16, 8, 4, 2, 1];
let bits = 0;
let nsm = 0;

let firstLSM = 0;
let secondLSM = 0;
let thirdLSM = 0;
let forthLSM = 0;
let lsm = 0;

let increment = 0;
let firstIP
let gatewayIP = 0;
let broadcast = 0;
let usable = 0;
let nextIP = 0;

let firstBroadcast = 0;
let secondBroadcast = 0;
let thirdBroadcast = 0;
let forthBroadcast = 0;

let firstGateway = 0
let secondGateway = 0
let thirdGateway = 0
let forthGateway = 0

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

    if (!checkEmpty(firstOctet, secondOctet, thirdOctet, forthOctet, subnetMask, host)) {
        alert("Please fill every field!");
        return;
    }

    if (!checkRange(firstOctet, secondOctet, thirdOctet, forthOctet, subnetMask, host)) {
        alert("Each octet has a limit of 0 - 255, a subnet mask has a limit of 0-32, and the host can't be less than 0");
        return;
    }

    ipAddress = `${firstOctet}.${secondOctet}.${thirdOctet}.${forthOctet}`;
    nsm = getNSM(sequence, host);
    lsm = getLSM(nsm);
    nextIP = getNextIP(increment);
    //gatewayIP = getGateway(firstOctet, secondOctet, thirdOctet, forthOctet);
    broadcast = getBroadcast();
    usable = getUsable();

    display();
    clear();
}

function checkEmpty(firstOctet, secondOctet, thirdOctet, forthOctet, subnetMask, host) {
    if ((firstOctet == "" || firstOctet == null) || (secondOctet == "" || secondOctet == null) || (thirdOctet == "" || thirdOctet == null) || (forthOctet == "" || forthOctet == null) || (subnetMask == "" || subnetMask == null) || host == "" || host == null) {
        return false;
    }
    return true;
}

function checkRange(firstOctet, secondOctet, thirdOctet, forthOctet, subnetMask, host) {
    if ((firstOctet > 255 || firstOctet < 0) || (secondOctet > 255 || secondOctet < 0) || (thirdOctet > 255 || thirdOctet < 0) || (forthOctet > 255 || forthOctet < 0) || (subnetMask > 32 || subnetMask < 0) || host < 0) {
        return false;
    }
    return true;
}

function display() {
    document.getElementById("ipResult").textContent =`IP Address: ${ipAddress} /${subnetMask}`;
    document.getElementById("hostResult").textContent = `Host: ${host}`;
    document.getElementById("bits").textContent = `Bits: ${bits}`;
    document.getElementById("nsm").textContent = `New Subnet Mask: /${nsm}`;
    document.getElementById("lsm").textContent = `Long Subnet Mask: ${lsm}`;
    document.getElementById("inc").textContent = `Increment: ${increment}`;
    //document.getElementById("network").textContent = `Network: ${firstOctet}.${secondOctet}.${thirdOctet}.${forthOctet}`;
    document.getElementById("range").textContent = `Range: ${usable}`;
    document.getElementById("broadcast").textContent = `Broadcast: ${broadcast}`;
    document.getElementById("nextIP").textContent = `Next IP: ${nextIP}`;
}


document.getElementById("clear").onclick = function() {
    document.getElementById("1stOctet").value = "";
    document.getElementById("2ndOctet").value = "";
    document.getElementById("3rdOctet").value = "";
    document.getElementById("4thOctet").value = "";
    document.getElementById("subnetMask").value = "";
    document.getElementById("host").value = "";

    document.getElementById("ipResult").textContent =`IP Address:`;
    document.getElementById("hostResult").textContent = `Host:`;
    document.getElementById("bits").textContent = `Bits:`;
    document.getElementById("nsm").textContent = `New Subnet Mask:`;
    document.getElementById("lsm").textContent = `Long Subnet Mask:`;
    document.getElementById("inc").textContent = `Increment:`;
    document.getElementById("range").textContent = `Range:`;
    document.getElementById("nextIP").textContent = `Next IP:`;

    clear();
}

function clear() {
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

    gatewayIP = 0;
    broadcast = 0;
    nextIP = 0;
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

function getNextIP(increment) {
    newfirstOctet = Number(firstOctet);
    newsecondOctet = Number(secondOctet);
    newthirdOctet = Number(thirdOctet);
    newforthOctet = Number(forthOctet);

    if (nsm > 24) {
        newforthOctet += increment;
    }
    else if (nsm > 16) {
        newthirdOctet += increment;
    }
    else if (nsm > 8) {
        newsecondOctet += increment;
    }
    else if (nsm > 0) {
        newfirstOctet += increment;
    }

   return `${newfirstOctet}.${newsecondOctet}.${newthirdOctet}.${newforthOctet}`;
}

/*function getGateway(fisrtOctet, secondOctet, thirdOctet, forthOctet) {
    firstGateway = Number(firstOctet);
    secondGateway = Number(secondOctet);
    thirdGateway = Number(thirdOctet);
    forthGateway = Number(forthOctet);

    if (nsm > 24) {
        if (forthOctet >= 0) {
            forthGateway += 1;
        }
    }
    else if (nsm > 16) {
        if (thirdOctet >= 0) {
            thirdGateway += 1;
        }
    }
    else if (nsm > 8) {
        if (secondOctet >= 0) {
            secondGateway += 1;
        }
    }
    else if (nsm > 0) {
        if (firstOctet >= 0) {
            firstGateway += 1;
        }
    }
    return `${firstGateway}.${secondGateway}.${thirdGateway}.${forthGateway}`;
}*/

function getBroadcast() {
    firstBroadcast = firstOctet;
    secondBroadcast = secondOctet;
    thirdBroadcast = thirdOctet;
    forthBroadcast = forthOctet;

    firstIP = `${firstOctet}.${secondOctet}.${thirdOctet}.${forthOctet}`;

    if (nsm > 24) {
        if (newforthOctet > 0) {
            forthBroadcast = newforthOctet - 1;
        }
    }
    else if (nsm > 16) {
        if (newforthOctet == 0) {
            thirdBroadcast = newthirdOctet - 1;
            forthBroadcast = 255;
        }
        else if (newforthOctet > 0) {
            thirdBroadcast = newthirdOctet -1;
        }
    }
    else if (nsm > 8) {
        if (newthirdOctet == 0) {
            secondBroadcast = newsecondOctet - 1;
            thirdBroadcast = 255;
        }
        else if (newthirdOctet > 0) {
            secondBroadcast = newsecondOctet -1;
        }

        if (newforthOctet == 0) {
            forthBroadcast = 255;
        }
        else if (newforthOctet > 0) {
            forthBroadcast = newforthOctet - 1;
        }
    }
    else if (nsm > 0) {
        
        if (newsecondOctet == 0) {
            firstBroadcast = newfirstOctet - 1;
            secondBroadcast = 225
        }
        else if (newsecondOctet > 0) {
            firstBroadcast = newfirstOctet -1;
        }

        if (newthirdOctet == 0) {
            thirdBroadcast = 255;
        }
        else if (newthirdOctet > 0) {
            forthBroadcast = newforthOctet - 1;
        }

        if (newforthOctet == 0) {
            forthBroadcast = 255;
        }
        else if (newforthOctet > 0) {
            forthBroadcast = newforthOctet - 1;
        }
    }

    return `${firstBroadcast}.${secondBroadcast}.${thirdBroadcast}.${forthBroadcast}`;
}

function getUsable() {
    let firstUsable1 = Number(firstOctet);
    let secondUsable1 = Number(secondOctet);
    let thirdUsable1 = Number(thirdOctet);
    let forthUsable1 = Number(forthOctet);

    let firstUsable2 = Number(firstBroadcast);
    let secondUsable2 = Number(secondBroadcast);
    let thirdUsable2 = Number(thirdBroadcast);
    let forthUsable2 = Number(forthBroadcast);

    if (nsm > 24) {
        /*if (forthOctet >= 0) {
            forthUsable1 += 1;
        }*/
       forthUsable1 += 1;
    }
    else if (nsm > 16) {
        /*if (thirdOctet >= 0) {
            thirdUsable1 += 1;
        }*/
       forthUsable1 += 1;
    }
    else if (nsm > 8) {
        /*if (secondOctet >= 0) {
            secondUsable1 += 1;
        }*/
        forthUsable1 += 1;
    }
    else if (nsm > 0) {
        /*if (firstOctet >= 0) {
            firstUsable1 += 1;
        }*/
        forthUsable1 += 1;
    }

    if (nsm > 24) {
        if (forthBroadcast >= 0) {
            forthUsable2 -= 1;
        }
    }
    else if (nsm > 16) {
        /*if (thirdBroadcast >= 0) {
            thirdUsable2 -= 1;
        }*/

        if (forthBroadcast == 0) {
            thirdUsable2 -= 1;
            forthUsable2 = 255;
        }
        else if (forthBroadcast > 0) {
            forthUsable2 -= 1;
        }
    }
    else if (nsm > 8) {
        if (secondBroadcast >= 0) {
            secondUsable2 -= 1;
        }
    }
    else if (nsm > 0) {
        if (firstBroadcast >= 0) {
            firstUsable2 -= 1;
        }
    }

    return `${firstUsable1}.${secondUsable1}.${thirdUsable1}.${forthUsable1} - ${firstUsable2}.${secondUsable2}.${thirdUsable2}.${forthUsable2} `
}