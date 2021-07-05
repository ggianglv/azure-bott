import puppeteer from 'puppeteer'

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export const getStockReport = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://tcinvest.tcbs.com.vn/my-asset')
  const content = await page.content()
  if (content.includes('<span class="mat-button-wrapper"> Đăng nhập </span>')) {
    const username = process.env.TCBS_USERNAME
    const password = process.env.TCBS_PASSWORD
    await page.type('input[formcontrolname=username]', username)
    await page.type('input[formcontrolname=password]', password)
    await page.click('.btn-login')
  }
  await page.waitForFunction("document.querySelectorAll('table tbody tr').length > 0")
  const tableData = await page.evaluate(() => {
    const data = []
    const trs = Array.from(document.querySelectorAll('table tbody tr'))
    trs.forEach((tr) => {
      const row = []
      const tds = tr.querySelectorAll('td')
      tds.forEach((td) => row.push(td.textContent))
      data.push(row)
    })

    return data.filter((item) => item.length > 1)
  })
  const result = [['Ticker', 'Giá', '%change', 'Số lượng', 'Lãi/lỗ']]
  tableData.forEach((item) => {
    const row = []
    const regex = /([A-Z]+)\s*([0-9.]+)\s*\|\s*(.+)/
    // eslint-disable-next-line no-unused-vars
    const [_, ticker, price, percentChange] = regex.exec(item[0])
    const [volume] = item[1].trim().split(' ')
    const [number, percent] = item[3].trim().split(' ').filter((it) => it)
    row.push(ticker, price, percentChange, volume, `*${number}* ( ${percent.trim()} )`)
    result.push(row)
  })
  let text = ''
  result.forEach((row) => {
    text += `${row.join('&nbsp;&nbsp;&nbsp;&nbsp;')}\n\n`
  })
  await browser.close()
  return text
}
