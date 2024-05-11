interface Description {
    geo: string;
    eng: string;
}
export interface Champion {
    img: string;
    name: string;
    hp: number;
    damage: number;
    abilityAvailable: boolean;
    description: Description;
}

const champData: Champion[] = [
    {
        img: '/assets/ironGard.jpeg',
        name: "ironGard",
        hp: 1500,
        damage: 200,
        abilityAvailable: true,
        description:{
            geo:"იმატებს 300 სიცოცხლეს, შემდეგ შეუძლია დარტყმა. 2 რაუნდის განმავლობაში აკლებს 250-ს.",
            eng:'Recovers 300 Hp, then can attack to an enemy. during 2 rounds it will have 250 Dmg.',
        }
    },
    {
        img:'/assets/Rafael.jpeg',
        name: "Rafael",
        hp: 1000,
        damage: 250,
        abilityAvailable: true,
        description:{
            geo:"პასივი: როდესაც განახორციელებს ნებისმიერ დარტყმას იმატებს 100 სიცოცხლეს.",
            eng:'passive: When he makes demage he heals himself by 100 Hp.',
        }
    },
    {
        img:'/assets/Revenger.jpeg',
        name: "Revenger",
        hp: 1250,
        damage: 200,
        abilityAvailable: true,
        description:{
            geo:"პასივი: თუ მოწინააღმდეგე მოგიკლავს ნებისმიერ კარტს, იმ კონკრეტულ მოწინააღმდეგეს Revenger აკლებს 400 სიცოცხლეს ყოველ დარტყმაზე.",
            eng:'passive: if an enemy kills any of your card, on that enemy Revenger will cause 400 Dmg on every hit.',
        }
    },
    {
        img:'/assets/DragonSkin.jpeg',
        name: "DragonSkin",
        hp: 1400,
        damage: 200,
        abilityAvailable: true,
        description:{
            geo:"პასივი: როდესაც სიცოცხლე გაუხდება 700 ან ნაკლები, მასზე ყველა დარტყმა ნახევრდება.",
            eng:'passive: when he reaches 700 Hp or less, he tackes half Dmg on every hit.',
        }
    },
    {
        img:'/assets/Pantheron.jpeg',
        name: "Pantheron",
        hp: 1200,
        damage: 250,
        abilityAvailable: true,
        description:{
            geo:"თავის გვერდზე აჩენს პანტერას, რომელსაც აქვს 500 სიცოცხლე და აკლებს 200 სიცოცხლეს. როდესაც პანტერა მოკვდება, Pantheron იმატებს 300 სიცოცხლეს.",
            eng:'Spawns a panther on its side that has 500 Hp and has 200 Dmg. When a panther dies, the Pantheron heals with 300 Hp.',
        }
    },
    {
        img:'/assets/PantherBlack.jpeg',
        name: "Black Panther",
        hp: 500,
        damage: 200,
        abilityAvailable: false,
        description:{
            geo:"",
            eng:'',
        }
    },
    {
        img:'/assets/Cacula.jpeg',
        name: "Cacula",
        hp: 1700,
        damage: 200,
        abilityAvailable: true,
                description:{
            geo:"ძალის გამოყენება შეუძლია ან საკუთარ კარტებზე ან მოწინააღმდეგეზე. თუ საკუთარ კარტს დაადებს ღრუბელს ეს კარტი იმატებს 150 სიცოცხლეს 2 რაუნდის განმავლობაში, ეფექტი მოქმედებს მაშინვე ითვლება მიმდინარე რაუნდიც. თუ Cacula ღრუბელს დაადებს მოწინააღმდეგეს მაშინ მოწინააღმდეგეს აკლდება 200 სიცოცხლე 2 რაუნდის განმავლობაში, ეფექტი მოქმედებს მაშინვე, ითვლება მიმდინარე რაუნდიც.",
            eng:'He can use the force either on his own cards or on the opponent. If you put your own card on the cloud, this card will heal by 150 Hp for 2 rounds, the effect takes effect immediately and the current round counts. If Cacula clouds an opponent then the opponent loses 200 Hp for 2 rounds, the effect takes effect immediately, the current round counts as well.',
        }
    },
    {
        img:'/assets/Sdrakem.jpeg',
        name: "Sdrakem",
        hp: 1400,
        damage: 200,
        abilityAvailable: true,
        description:{
            geo:"2 რაუნდის განმავლობაში რომელიმე საკუთარ კარტს ან თავის თავს მალავს ჩრდილში, რომელიც იქნება ჩრდილში იმ კარტზე არავის შეეძლება დარტყმა. ითვლება მიმდინარე რაუნდიც.",
            eng:'For two rounds, he hides one of his cards or himself in a shadow, and no one can hit that card in the shadow. The current round counts',
        }
    },
    {
        img:'/assets/Meilis.jpeg',
        name: "Meilis",
        hp: 1000,
        damage: 250,
        abilityAvailable: true,
        description:{
            geo:"საკუთარ თავს ან ნებისმიერ თავისიანს უმატებს 500 სიცოცხლეს.",
            eng:'she can heal herself or her temate by 500 Hp.',
        }
    },
    {
        img:'/assets/Thornn.jpeg',
        name: "Thornn",
        hp: 1550,
        damage: 200,
        abilityAvailable: true,
        description:{
            geo:"პასივი: რამდენსაც დააკლებს მოწინააღმდეგე იმის ნახევარი თვითონაც აკლდება.",
            eng:'passive: As much as the opponent Demages Thornn, opponent also takes half of its Dmg.',
        }
    },
    {
        img:'/assets/Visioner.jpeg',
        name: "Visioner",
        hp: 1350,
        damage: 200,
        abilityAvailable: true,
        description:{
            geo:"იღებს ერთ აითემს",
            eng:'can take one item',
        }
    },
    {
        img:'/assets/Hurricane.jpeg',
        name: "Hurricane",
        hp: 1800,
        damage: 200,
        abilityAvailable: true,
        description:{
            geo:"შეუძლია დაბლოკოს ნებისმიერი მოწინააღმდეგის შესაძლებლობა, იქამდე სანამ ისინი ვინმეს არ მოკლავენ.",
            eng:'can block any opponents abbilitie before they kill someone.',
        }
    },
    {
        img:'/assets/Sespa.jpeg',
        name: "Sespa",
        hp: 1200,
        damage: 200,
        abilityAvailable: true,
        description:{
            geo:"შეუძლია გაიმეოროს ნებისმიერი მოწინააღმდეგის შესაძლებლობა, თუმცა დაკლონვაში ხარჯავს სვლას. თუ სხვა შესაძლებლობის დაკლონვა მოგინდა სვლას დახარჯავ, მაგრამ თუ იგიე შესაძლებლობის გამოყენება გინდა, შეგიძლია მაშინვე გამოიყენო.",
            eng:'Can repeat any opponents ability, but spends a turn. if you want to repeat other ability you will spend turn again to clone, but if you want to use already cloned abbility you can use it immediately',
        }
    },
    {
        img:'/assets/Mouzer.jpeg',
        name: "Mouzer",
        hp: 1100,
        damage: 250,
        abilityAvailable: true,
        description:{
            geo:"ნებისმიერ ერთ მოწინააღმდეგეს აუკიდებს ცეცხლს და ყველა რაუნდის განმავლობაში ამ მოწინააღმდეგეს აკლდება 100 სიცოცხლე. თუ მოწინააღმდეგე მოკვდა ძალა ავტომატურად უნახლდება. თუ Mouzer მოკვდა ძალა მაინც მოქმედებს.",
            eng:'Sets any one opponent on fire and deals 100 Dmg in every round. If the opponent dies, the abbility is automatically renewed. If the Mouzer dies the abbility still works.',
        }
    },
    {
        img:'/assets/Ars.jpeg',
        name: "Ars",
        hp: 900,
        damage: 200,
        abilityAvailable: true,
        description:{
            geo:"პასივი: როდესაც ნებისმიერი მოწინააღმდეგე მოკვდება Ars იმატებს 200 სიცოცხლეს და დარტყმა ეზრდება 100 -ით, ეს ხდება იმდენჯერ რამდენჯერაც მოწინააღმდეგის კარტი მოკვდება.",
            eng:'passive: When any opponent dies, Ars gains 200 Hp and increase Dmg by 100, this happens every time when the opponents card dies.',
        }
    },
    // {
    //     img:'/assets/MoonLight.jpeg',
    //     name: "Moon light",
    //     hp: 1100,
    //     damage: 250,
    //     abilityAvailable: true,
    //     description:{
    //         geo:"",
    //         eng:'',
    //     }
    // },
    {
        img:'/assets/KingNolaran.jpeg',
        name: "King Nolaran",
        hp: 1400,
        damage: 200,
        abilityAvailable: true,
        description:{
            geo:"პასივი: როდესაც KingNolaran მოკლავს მოწინააღმდეგეს ყველა მოწინააღმდეგეს აკლდება 150 სიცოცხლე. თუ თვითნ მოკვდა KingNolaran ამ შემთხვევაში ყველა მოწინააღმდეგეს აკლდება 100 სიცოცხლე.",
            eng:'Passive: When KingNolaran kills an opponent, all opponents will lose 150 Hp. If KingNolaran dies, all opponents lose 100 Hp.',
        }
    },
    // {
    //     img:'/assets/Chaos.jpeg',
    //     name: "Chaos",
    //     hp: 1900,
    //     damage: 200,
    //     abilityAvailable: true,
    //     description:{
    //         geo:"",
    //         eng:'',
    //     }
    // },
    {
        img:'/assets/Gogothur.jpeg',
        name: "Gogothur",
        hp: 2200,
        damage: 250,
        abilityAvailable: true,
        description:{
            geo:"არ აქვს ძალა!",
            eng:'has no abbilitie!',
        }
    },
    // {
    //     img:'/assets/Orion.jpeg',
    //     name: "Orion",
    //     hp: 1150,
    //     damage: 250,
    //     abilityAvailable: true,
    //     description:{
    //         geo:"",
    //         eng:'',
    //     }
    // },
    {
        img:'/assets/Magma.jpeg',
        name: "Magma",
        hp: 2050,
        damage: 150,
        abilityAvailable: true,
        description:{
            geo:"შესაძლებლობა: რომელიმე მოწინააღმდეგეს აკლებს 300 სიცოცხლეს და იმატებს 200 სიცოცხლეს.  პასივი: ვინც დაარტყავს Magma- ს თვითონაც აკლდება 100 სიცოცხლე.",
            eng:'Ability: deals 300 Hp on one opponent and gains 200 Hp. Passive: Anyone that hits Magma also loses 100 Hp.',
        }
    },
    {
        img:'/assets/Meteorc.jpeg',
        name: "Meteorc",
        hp: 1800,
        damage: 200,
        abilityAvailable: true,
        description:{
            geo:"ისვრის მეტეორს, რომელიც ყველა მოწინააღმდეგეს აკლებს 200 სიცოცხლეს",
            eng:'throws meteor that deals 200 Dmg on every opponent',
        }
    },
    {
        img:'/assets/Groguard.jpeg',
        name: "Groguard",
        hp: 1350,
        damage: 250,
        abilityAvailable: true,
        description:{
            geo:"შეუძლია საკუთარ თავს ან რომელიმე თავისიანს დაადოს ფარი. ვისაც ადევს ფარი მასზე ყველა დარტყმა განახევრდება 2 რაუნდის განმავლობაში, მიმდინარე რაუნდიც ითვლება.",
            eng:'Can shield himself or one of his teamate. Whoever is wearing the shield will take half Dmg for 2 rounds, The current round counts.',
        }
    },
    // {
    //     img:'/assets/Electrition.jpeg',
    //     name: "Electrition",
    //     hp: 1900,
    //     damage: 200,
    //     abilityAvailable: true,
    //             description:{
    //         geo:"",
    //         eng:'',
    //     }
    // },
    // {
    //     img:'/assets/Oull.jpeg',
    //     name: "Oull",
    //     hp: 1200,
    //     damage: 200,
    //     abilityAvailable: true,
    //     description:{
    //         geo:"",
    //         eng:'',
    //     }
    // },
    // {
    //     img:'/assets/Seismo.jpeg',
    //     name: "Seismo",
    //     hp: 1650,
    //     damage: 200,
    //     abilityAvailable: true,
    //     description:{
    //         geo:"",
    //         eng:'',
    //     }
    // },
    // {
    //     img:'/assets/Pyrobadger.jpeg',
    //     name: "Pyrobadger",
    //     hp: 1600,
    //     damage: 200,
    //     abilityAvailable: true,
    //     description:{
    //         geo:"",
    //         eng:'',
    //     }
    // },
    // {
    //     img:"/assets/Aart'Adur.jpeg",
    //     name: "Aart'adur",
    //     hp: 1600,
    //     damage: 200,
    //     abilityAvailable: true,
    //     description:{
    //         geo:"",
    //         eng:'',
    //     }
    // },
    // {
    //     img:"/assets/Za'e.jpeg",
    //     name: "Za'e",
    //     hp: 200,
    //     damage: 150,
    //     abilityAvailable: false,
    //             description:{
    //         geo:"",
    //         eng:'',
    //     }
    //     //dodge 35%  display on front line when Aart adur kills someone
    // },
    // {
    //     img:"/assets/loyd&bobo.jpeg",
    //     name: "loyd&bobo",
    //     hp: 1700,
    //     damage: 200,
    //     abilityAvailable: true,
    //             description:{
    //         geo:"",
    //         eng:'',
    //     }
    // },
]

export default champData