// Execute button
let btn = document.querySelector('button')
let inputs = document.querySelectorAll('input')
// Percent subtractive function
function minusPercent(n, p) {
    return n - (n * (p / 100))
}

function checkNegative(e) {
    let input = e.target
    if (isNaN(input.value) || input.value < 0) {
        input.value = 0
    }
}

function calc() {

    let inheritance = +document.querySelector('.inheritance').value
    // q => quantity
    let qFather = +document.querySelector('.father-quantity').value
    let qMother = +document.querySelector('.mother-quantity').value
    let qHusband = +document.querySelector('.husband-quantity').value
    let qWife = +document.querySelector('.wife-quantity').value
    let qSon = +document.querySelector('.son-quantity').value
    let qDaughter = +document.querySelector('.daughter-quantity').value
    let qChilds = qSon + qDaughter
    let qParents = qFather + qMother
    // i => inheritance
    let iFather = 0
    let iMother = 0
    let iHusband = 0
    let iWife = 0
    let iSon = 0
    let iDaughter = 0

    // r => result to html
    let rFather = document.querySelector('.father-inheritance')
    let rMother = document.querySelector('.mother-inheritance')
    let rHusband = document.querySelector('.husband-inheritance')
    let rWife = document.querySelector('.wife-inheritance')
    let rSon = document.querySelector('.son-inheritance')
    let rDaughter = document.querySelector('.daughter-inheritance')

    if (qHusband > 0) {
        qWife = 0
        iWife = 0
        rWife.innerHTML = iWife
        if (qChilds == 0 && qParents == 0) {
            iHusband = inheritance
        } else if (qParents > 0 && qChilds > 0) {
            iHusband = inheritance / 4
        } else if (qParents > 0 && qChilds == 0) {
            iHusband = inheritance / 2
        } else if (qChilds > 0 && qParents == 0) {
            iHusband = inheritance / 4
        }
        rHusband.innerHTML = iHusband.toFixed(2)
        inheritance -= iHusband
    }

    if (qWife > 0) {
        qHusband = 0
        iHusband = 0
        rHusband.innerHTML = iHusband
        if ((qChilds > 0 && qParents > 0) || qChilds > 0) {
            iWife = inheritance - minusPercent(inheritance, qWife * 12.5)
        } else if (qParents > 0 && qChilds == 0) {
            iWife = (inheritance / 4) * qWife
        } else if (qParents == 0 && qChilds == 0) {
            iWife = inheritance / qWife
        }
        rWife.innerHTML = iWife.toFixed(2)
        inheritance -= iWife
    }
    if ((qHusband > 0 || qWife > 0) || qChilds > 0 || qParents > 0) {
        if (qChilds == 0) {
            if (qFather > 0 && qMother > 0) {
                iMother = inheritance - minusPercent(inheritance, 33)
                iFather = inheritance - minusPercent(inheritance, 66)
                rFather.innerHTML = iFather.toFixed(2)
                rMother.innerHTML = iMother.toFixed(2)
            }
            else if (qFather > 0 && qMother == 0) {
                iFather = inheritance
                rFather.innerHTML = iFather.toFixed(2)
                inheritance -= iFather
            }
            else if (qMother > 0 && qFather == 0) {
                iMother = inheritance
                rMother.innerHTML = iMother.toFixed(2)
                inheritance -= iMother
            }
        } else if (qChilds > 0) {
            if (qFather > 0 && qMother > 0) {
                iFather = inheritance - minusPercent(inheritance, 16.66)
                iMother = inheritance - minusPercent(inheritance, 16.66)
            } else if (qFather > 0 && qMother == 0) {
                iFather = inheritance - minusPercent(inheritance, 16.66)
            } else if (qMother > 0 && qFather == 0) {
                iMother = inheritance - minusPercent(inheritance, 16.66)
            }
            rMother.innerHTML = iMother.toFixed(2)
            rFather.innerHTML = iFather.toFixed(2)
            inheritance -= (iFather + iMother)
        }
    }

    let Childs = inheritance / ((qSon * 2) + qDaughter)
    if (qSon > 0 && qDaughter > 0) {
        iSon = (Childs * 2).toFixed(2)
        iDaughter = (Childs).toFixed(2)
        rSon.innerHTML = iSon
        rDaughter.innerHTML = iDaughter
    } else if (qSon > 0 && qDaughter == 0) {
        iSon = (inheritance / qSon).toFixed(2)
        rSon.innerHTML = iSon
        rDaughter.innerHTML = 0
    } else if (qSon == 0 && qDaughter > 0) {
        iDaughter = (inheritance / qDaughter).toFixed(2)
        rDaughter.innerHTML = iDaughter
        rSon.innerHTML = 0
    }
    if (qFather == 0) {
        rFather.innerHTML = 0.00
    }
    if (qMother == 0) {
        rMother.innerHTML = 0.00
    }
    if (qHusband == 0) {
        rHusband.innerHTML = 0.00
    }
    if (qWife == 0) {
        rWife.innerHTML = 0.00
    }
    if (qSon == 0) {
        rSon.innerHTML = 0.00
    }
    if (qDaughter == 0) {
        rDaughter.innerHTML = 0.00
    }
}
btn.onclick = () => {
    calc()
}

inputs.forEach(item => {
    item.addEventListener('change', checkNegative)
    item.addEventListener('change', calc)
})