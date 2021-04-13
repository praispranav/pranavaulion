import namor from 'namor';

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newUser = () => {
  const statusChance = Math.random()
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
	initials: namor.generate({ words: 1, numbers: 0 }),	
    lastName: namor.generate({ words: 1, numbers: 0 }),
    address1: namor.generate({ words: 1, numbers: 0 }),
    address2: namor.generate({ words: 1, numbers: 0 }),
	address3: namor.generate({ words: 1, numbers: 0 }),
	zip: namor.generate({ words: 1, numbers: 0 }),	
    city: namor.generate({ words: 1, numbers: 0 }),
    state: namor.generate({ words: 1, numbers: 0 }),	
    country: namor.generate({ words: 1, numbers: 0 }),
	gender: namor.generate({ words: 1, numbers: 0 }),	
	dateBirth: namor.generate({ words: 1, numbers: 0 }),		
    age: Math.floor(Math.random() * 30),
    phone: namor.generate({ words: 1, numbers: 0 }),	
    mobile: namor.generate({ words: 1, numbers: 0 }),
	skype: namor.generate({ words: 1, numbers: 0 }),	
    height: namor.generate({ words: 1, numbers: 0 }),	
    weight: namor.generate({ words: 1, numbers: 0 }),
	

    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

export default function makeUsers(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newUser(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}