// Define variables
const btn = document.querySelector('.share-btn')
const sharePop = document.querySelector('.share-pop')
const shareBtn = document.querySelector('.share-btn').style
const faShare = document.querySelector('.fa-share').style
const square = document.querySelector('.square-box').style

// Event listeners to show share elements
btn.addEventListener('click', function () {
  // eslint-disable-next-line no-undef
  const displayValue = getComputedStyle(sharePop).display

  if (displayValue === 'none') {
    shareBtn.backgroundColor = 'var(--grayish-blue)'
    faShare.color = 'var(--light-grayish-blue)'
    sharePop.style.display = 'flex'
    square.zIndex = '0'
  } else {
    shareBtn.backgroundColor = 'var(--light-grayish-blue)'
    faShare.color = 'var(--grayish-blue)'
    sharePop.style.display = 'none'
    square.zIndex = '-1'
  }
})
