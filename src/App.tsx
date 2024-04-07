import Names from './assets/names.json'
import personality_traits from './assets/personality_traits.json'
import jobs from './assets/jobs.json'

const male_first_names: string[] = Names.male_first_names;
const female_first_names:string[] = Names.female_first_names;
const last_names:string[] = Names.last_names;


function App() {
  function generatePersonality(n:number) {
    const personality:string[] = [];
    for (let i = 0; i < n; i++) {
      const trait = personality_traits[Math.floor(Math.random() * personality_traits.length)];
      if(personality.includes(trait)) {
        i--;
        continue;
      }
      personality.push(trait);
      if (i < n - 1) {
        personality.push(', ');
      }
    }
    return personality;
  }

  function generateJob(gender:string) {
    var job:string = '';
    if(gender === "male"){
      job = jobs.male_jobs[Math.floor(Math.random() * jobs.male_jobs.length)];
    }
    else{
      job = jobs.female_jobs[Math.floor(Math.random() * jobs.female_jobs.length)];
    }
    return job;
  }

  function generateMaleNPC() {
    const firstName = male_first_names[Math.floor(Math.random() * male_first_names.length)];
    const lastName = last_names[Math.floor(Math.random() * last_names.length)];
    const personality = generatePersonality(4);
    const img = `https://thispersondoesnotexist.com/`;
    const gender:string = 'male';
    const job = generateJob(gender);
    const male_npc = {
      personality,
      firstName,
      lastName,
      gender,
      job,
      img,
      age: (Math.floor(Math.random() * 100) + 18)
    };
    return male_npc;
  }
  
  function generateFemaleNPC() {
    const firstName = female_first_names[Math.floor(Math.random() * female_first_names.length)];
    const lastName = last_names[Math.floor(Math.random() * last_names.length)];
    const personality = generatePersonality(4)
    const img = `https://thispersondoesnotexist.com/`;
    const gender:string = 'female';
    const job = generateJob(gender)
    const female_npc = {
      personality,
      firstName,
      lastName,
      img,
      gender,
      job,
      age: (Math.floor(Math.random() * 100) + 18)
    };
    return female_npc;
  }

  function createFamily() {
    const family = {
      father: generateMaleNPC(),
      mother: generateFemaleNPC(),
      children: [] as { firstName: string; lastName: string; gender: string; age: number, personality:string[], img:string }[],
      family_name: ''
    };
    family.family_name = family.father.lastName + ' ' + family.mother.lastName;
    const numChildren = Math.floor(Math.random() * 5);
    for (let i = 0; i < numChildren; i++) {
      const child = Math.random() > 0.5 ? generateMaleNPC() : generateFemaleNPC();
      child.lastName = family.father.lastName + ' ' + family.mother.lastName;
      child.personality = generatePersonality(4); 
      child.img = `https://thispersondoesnotexist.com/`;
      child.age = Math.floor(Math.random() * 100);
      if (child.age > family.father.age || child.age > family.mother.age) {
        child.age = Math.min(family.father.age, family.mother.age) - 18;
      }
      const is_duplicated_child = family.children.some((c) => c.firstName === child.firstName);
      if (!is_duplicated_child) {
        family.children.push(child);
      }
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
          <div className="flex gap-8">
            <section className="w-1/2">
              <h3 className="text-xl font-bold mb-2">Father</h3>
              <div className="bg-white p-4 rounded-lg shadow-md border">
                <p><strong className="capitalize">Name:</strong> {family.father.firstName} {family.father.lastName}</p>
                <p><strong className="capitalize">Job:</strong> <span className="capitalize">{family.father.job}</span></p>
                <p><strong className="capitalize">Profile: </strong> {family.father.personality}</p>
              </div>
            </section>
            <section className="w-1/2">
              <h3 className="text-xl font-bold mb-2">Mother</h3>
              <div className="bg-white p-4 rounded-lg shadow-md border">
                <p><strong className="capitalize">Name:</strong> {family.mother.firstName} {family.mother.lastName}</p>
                <p><strong className="capitalize">Job:</strong> <span className="capitalize"> {family.mother.job} </span></p>
                <p><strong className="capitalize">Profile: </strong> {family.mother.personality}</p>
              </div>
            </section>
          </div>
          <section className="w-full mt-8">
              <h3 className="text-xl font-bold mb-2">Children</h3>
              <div className="bg-white px-8 py-4 rounded-lg shadow-md border">
                {family.children.length > 0 ? (
                  <ol>
                    {family.children.map((child, index) => (
                      <li key={index}>
                        <ol>
                          <li className='list-disc'>
                            <strong className="capitalize">Name:</strong> {child.firstName} {child.lastName}
                          </li>
                          <li>
                            <strong className="capitalize">Profile:</strong> {child.personality}
                          </li>
                        </ol>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>No Children</p>
                )}
              </div>
            </section>
        </article>
      </main>
    </>
  )
}

export default App
