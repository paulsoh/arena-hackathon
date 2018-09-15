const Deck = require('kittik')

Deck.create({
  slides: [{
    shapes: [
        {
            name: 'Slide#0',
            type: 'FigText',
            options: {
                text: "THE 'REAL' PROBLEM",
                x: 'center',
                y: 4
            }
        },
        {
            name: 'Slide#1',
            type: 'Text',
            options: {
                text: "We try to solve 'the real' problem.",
                x: 'center',
                y: 10
            }
        },
        {
            name: 'Slide#2',
            type: 'FigText',
            options: {
                text: "1.2 BILLION",
                x: 'center',
                y: 12
            }
        },
        {
            name: 'Slide#3',
            type: 'Text',
            options: {
                text: "global annual spend on recruitment in clinical trial.",
                x: 'center',
                y: 18
            }
        },
        {
            name: 'Slide#4',
            type: 'FigText',
            options: {
                text: "46% of trials fail",
                x: 'center',
                y: 20
            }
        },
        {
            name: 'Slide#5',
            type: 'Text',
            options: {
                text: "due to poor recruitment.",
                x: 'center',
                y: 26
            }
        },
        {
            name: 'Slide#6',
            type: 'Text',
            options: {
                text: "We focus on Lasagna' Law.",
                x: 'center',
                y: 29
            }
        },
        {
            name: 'Slide#7',
            type: 'FigText',
            options: {
                text: "Lasagna' Law",
                x: 'center',
                y: 30
            }
        },
        {
            name: 'Slide#8',
            type: 'Text',
            options: {
                text: "The number of patients available to join a trial drops by 90% the day a trial begins.\n They re-appear as soon as the study is over.\n\n\n",
                x: 'center',
                y: 36
            }
        },
        {
            name: 'Slide#9',
            type: 'FigText',
            options: {
                text: "As a Result,",
                x: 'center',
                y: 40
            }
        },
        {
            name: 'Slide#10',
            type: 'Text',
            options: {
                text: "Patients got a chance of treat their disease.\nAnd got a financial blah blah.",
                x: 'center',
                y: 47
            }
        },
        {
            name: 'Slide#11',
            type: 'Text',
            options: {
                text: "It can reduce the need for socially wasted goods.",
                x: 'center',
                y: 50
            }
        },
        {
            name: 'Slide#12',
            type: 'FigText',
            options: {
                text: "THANKS, We show you it.",
                x: 'center',
                y: 52
            }
        },
        
    ],
    animations: [
        {
            name: 'typing',
            type: 'Print',
            options: {
                duration: 1500
            }
        },
        {
            name: 'typing#2',
            type: 'Print',
            options: {
                duration: 4000
            }
        },
        {
            name: 'typingSlow',
            type: 'Print',
            options: {
                duration: 5000
            }
        }
    ],
    order: [
      'Slide#0::typing#2',
      'Slide#1::typing',
      'Slide#2::typing',
      'Slide#3::typing',
      'Slide#4::typing',
      'Slide#5::typing',
      'Slide#6::typing',
      'Slide#7::typing',
      'Slide#8::typing#2',
      'Slide#9::typingSlow',
      'Slide#10::typing#2',
      'Slide#11::typing#2',
      'Slide#12::typing#2'
    ]
  }]
}).run()