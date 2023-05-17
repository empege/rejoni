// Baza podataka ulica i rejona kojima pripadaju
const rejon_1 = {
  label: '1',
  streets: [
    'Zorana Djindjica 1 - 115',
    'Ime ulice',
  ]
}

const ledine = {
  label: 'Ledine',
  streets: [
    'Zorana Djindjica 116 - 500',
    'Ime ulice neke druge',
  ]
}

const allDistricts = [
  rejon_1,
  ledine,
  // rejon_3,
  // rejon_4,
  // rejon_5,
  // rejon_6,
  // rejon_7,
  // rejon_8,
  // rejon_9,
  // rejon_10,
]

// Elements
const resultsContent = document.querySelector('.results__content')
const searchInput = document.getElementById('search')

// Functions
const createElement = (tag = 'div', classes, text, data) => {
  const el = document.createElement(tag)
  if (text) {
    el.innerText = text
  }
  if (data) {
    el.dataset.street = data
  }
  el.classList.add(...classes)
  return el
}

function sortByDistrict(a, b) {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
}

// const sortByDistrict = (a,b) => {
//   a.district - b.district
// }

const handleChange = (e) => {
  const searchValue = e.target.value.toUpperCase()

  districtElements.forEach(item => {
    if (searchValue === '' || item.dataset.street.includes(searchValue)) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
}

const createItems = (items) => {
  items.forEach(item => {
    item.streets.forEach(currentStreet => {
      const streetToUppercase = currentStreet.toUpperCase()
      const wrapper = createElement('div', ['districts__items-wrapper'], undefined, streetToUppercase)
      const street = createElement('span', ['districts__item', 'districts__item--street'], currentStreet)
      const district = createElement('span', ['districts__item', 'districts__item--district-number'], item.label)
      wrapper.appendChild(street)
      wrapper.appendChild(district)
      resultsContent.append(wrapper)
    })
  })
}

// Event listeners
searchInput.addEventListener('input', handleChange)
console.log(allDistricts)
// Prodji kroz sve rejone, dodaj svakoj ulici njen rejon radi lakse pretrage posle
// const districts = [].concat(...allDistricts.map(district => {
//   return district.streets.map(district => {
//     return { street: district.street, district: district.label}
//   })
// }))
// Sortiraj prema rejonu i ispisi sve
allDistricts.sort(sortByDistrict)
createItems(allDistricts)
const districtElements = document.querySelectorAll('.results__content .districts__items-wrapper')