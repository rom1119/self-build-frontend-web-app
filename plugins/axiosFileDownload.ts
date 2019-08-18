function createUriFromObj(data, withQuestionMark = true) {
  if(!data) return ''
  let queryString = ''
  for (let name1 in data) {

    if (typeof data[name1] === 'object') {
      for (let name in data[name1]) {
        if (data[name1][name] === null) continue
        queryString += `${name1}[${name}]=`
        if (Array.isArray(data[name1][name])) {
          queryString += encodeURIComponent(data[name1][name].join(','))
        } else {
          queryString += encodeURIComponent(data[name1][name])
        }
        queryString += '&'
      }
    } else if (data[name1] == null) {
      continue
    } else {
      queryString += `${name1}=${encodeURIComponent(data[name1])}&`
    }
  }
  if (withQuestionMark) {
    queryString = `?${queryString}`
  }
  return queryString.substr(0, queryString.length - 1)
}


export default function ({$axios}) {
  $axios.$downloadFile = async function (url, params = {filename: 'file'}) {
    return new Promise((resolve, reject) => {
      $axios.get(url + createUriFromObj(params), {responseType: 'blob'}).then(response => {
        let filename = response.headers.filename? response.headers.filename : params.filename
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
        resolve()
      }).catch(() => {
        reject()
      })
    })
  }
}
