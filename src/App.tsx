import Names from './assets/names.json'

const male_first_names: string[] = Names.male_first_names;
const female_first_names:string[] = Names.female_first_names;
const last_names:string[] = Names.last_names;


function App() {
  function generateMaleNPC() {
    const firstName = male_first_names[Math.floor(Math.random() * male_first_names.length)];
    const lastName = last_names[Math.floor(Math.random() * last_names.length)];
    const male_npc = {
      firstName,
      lastName,
      gender: 'male',
      age: (Math.floor(Math.random() * 100) + 18)
    };
    return male_npc;
  }
  
  function generateFemaleNPC() {
    const firstName = female_first_names[Math.floor(Math.random() * female_first_names.length)];
    const lastName = last_names[Math.floor(Math.random() * last_names.length)];
    const female_npc = {
      firstName,
      lastName,
      gender: 'female',
      age: (Math.floor(Math.random() * 100) + 18)
    };
    return female_npc;
  }

  function createFamily() {
    const family = {
      father: generateMaleNPC(),
      mother: generateFemaleNPC(),
      children: [] as { firstName: string; lastName: string; gender: string; age: number}[],
      family_name: ''
    };
    family.family_name = family.father.lastName + ' ' + family.mother.lastName;
    const numChildren = Math.floor(Math.random() * 5);
    for (let i = 0; i < numChildren; i++) {
      const child = Math.random() > 0.5 ? generateMaleNPC() : generateFemaleNPC();
      child.lastName = family.father.lastName + ' ' + family.mother.lastName; 
      child.age = Math.floor(Math.random() * 100);
      if (child.age > family.father.age || child.age > family.mother.age) {
        child.age = Math.min(family.father.age, family.mother.age) - 18;
      }
      family.children.push(child);
    }
    return family;
  };

  const family = createFamily();
  return (
    <>
      <main className="container mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold uppercase">Family builder</h1>
        <article className="my-8">
          <h2 className="text-2xl font-bold mb-4">Family: {family.family_name}</h2>
          <div className="flex d-flex gap-8">
            <section>
              <h3 className="text-xl font-bold">Father</h3>
              <p>{family.father.firstName} {family.father.lastName}</p>
            </section>
            <section>
              <h3 className="text-xl font-bold">Mother</h3>
              <p>{family.mother.firstName} {family.mother.lastName}</p>
            </section>
            <section>
              <h3 className="text-xl font-bold">Children:</h3>
              <ul>
                {family.children.length > 0 ? family.children.map((child, index) => (
                  <li key={index}>{child.firstName} {child.lastName}</li>
                )) : <li>No Children</li>
                }
              </ul>
            </section>
          </div>
        </article>
      </main>
    </>
  )
}

export default App
