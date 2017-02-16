/* Import nessary API */
const fs = require('fs');

/* Initialize values */
const ageWise = {};
const stateWise = {};
const eduCategory = {};
const fileName = ['./data/India2011.csv', './data/IndiaSC2011.csv',
     './data/IndiaST2011.csv'];
let title = [];

/* Formmating data in object for D3 js */
function values (obj) {
  let vals = [];
  for(let key in obj) {
      if (obj.hasOwnProperty(key)) {
          vals.push(obj[key]);
      }
  }
  return vals;
}
/* Function to process CSV and populate Array */
function csvProcessor(fileN) {
  /* Check if file exists */
      let ageGroup;
      let stateGroup;
      let eduTitle;
      fs.readFileSync(fileN).toString().split('\n').forEach(function (line, index) {
          let temp = line.split(',');
          if (index === 0) {
              title = temp;
          }
          if(line !== '' && index !== 0) {
          /* Criteria to opulating Agewise data*/
          if (temp[4] === 'Total' && temp[5] !== 'All ages' && temp[5] !== '0-6') {
            let literatePop = parseInt(temp[12], 10);
            if (temp[5] in ageWise)
            {
              ageGroup = temp[5];
              ageWise[ageGroup].total = ageWise[ageGroup].total + literatePop;
            }
            else{
              ageGroup = temp[5];
              ageWise[ageGroup] = {
                group: ageGroup,
                total: literatePop
              };
            }
          }

          /* Criteria to opulating Statewise data*/
          if(temp[4] === 'Total' && temp[5] === 'All ages') {
            let stateMalePop = parseInt(temp[40], 10);
            let stateFemalePop = parseInt(temp[41], 10);
            if (temp[3] in stateWise) {
              stateGroup = temp[3];
              stateWise[stateGroup].male = stateWise[stateGroup].male + stateMalePop;
              stateWise[stateGroup].female = stateWise[stateGroup].female + stateFemalePop;
            }
            else{
              stateGroup = temp[3].trim().match(/^State\s+-\s+(.*)$/i);
              stateGroup = stateGroup[1];
              stateWise[stateGroup] = {
                state: stateGroup,
                male: stateMalePop,
                female: stateFemalePop
            };
            }
          }

/* Criteria to opulating Education category wise data*/
            for(let eduStart = 15; eduStart <= 43; eduStart = eduStart + 3) {
              let edu = title[eduStart].trim()
              .match(/^Educational level\s+-\s+(.*[^\\*])\s+-\s+\w*$/i);
                eduTitle = edu[1];
                if(eduTitle in eduCategory)
                {
                  eduCategory[eduTitle].total = eduCategory[eduTitle].total +
                  parseInt(temp[eduStart], 10);
                }
                else {
                  eduCategory[eduTitle] = {
                  eduLevel: eduTitle,
                  total: parseInt(temp[eduStart], 10)
                  };
                }
            }
        }
      });
  }

/* Loop to call csv processor for each file */
for(let i = 0; i < 3; i = i + 1) {
  /* getting file name */
  let fName = fileName[i];
  /* Passing file name to csvProcessor */
  csvProcessor(fName);
  }


fs.writeFile('./output/age.json', JSON.stringify(values(ageWise)));
fs.writeFile('./output/state.json', JSON.stringify(values(stateWise)));
fs.writeFile('./output/education.json', JSON.stringify(values(eduCategory)));
