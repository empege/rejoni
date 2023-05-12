// Baza podataka ulica i rejona kojima pripadaju
const rejon_1 = [
  'Zorana Djindjica 1 - 115',
  'Ime ulice',
]

const rejon_2 = [
  'Zorana Djindjica 116 - 500',
  'Ime ulice neke druge',
]

const allDistricts = [
  rejon_1,
  rejon_2,
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

const sortByDistrict = (a,b) => {
  a.district - b.district
}

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
    const streetToUppercase = item.street.toUpperCase()
    const wrapper = createElement('div', ['districts__items-wrapper'], undefined, streetToUppercase)
    const street = createElement('span', ['districts__item', 'districts__item--street'], item.street)
    const district = createElement('span', ['districts__item', 'districts__item--district-number'], item.district)
    wrapper.appendChild(street)
    wrapper.appendChild(district)
    resultsContent.append(wrapper)
  })
}

// Event listeners
searchInput.addEventListener('input', handleChange)

// Prodji kroz sve rejone, dodaj svakoj ulici njen rejon radi lakse pretrage posle
const districts = [].concat(...allDistricts.map((district, id) => {
  return district.map(street => {
    return { street, district: id + 1}
  })
}))
// Sortiraj prema rejonu i ispisi sve
districts.sort(sortByDistrict)
createItems(districts)
const districtElements = document.querySelectorAll('.results__content .districts__items-wrapper')