import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { Idata } from 'src/app/models/data.interface';



@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})



export class DataComponent implements OnInit {

  constructor(private api: ApiService) { }

  dataOfUSA!: Idata[] ;

  indexToPaintPopulation = 0;

  mobile=false;

  ngOnInit(): void {
    this.api.getData().subscribe(data => {
      //sort the array dwon to up
      let arrayBeforeCalculationOfGrowthPercentages = data.data.sort((a:Idata,b:Idata) => (a['ID Year'] < b['ID Year']) ? -1 : ((b['ID Year'] > a['ID Year']) ? 1 : 0))

      this.paint(data.data);

      this.dataOfUSA = this.updateTheGrowthPercentages(arrayBeforeCalculationOfGrowthPercentages);

      // get the width of the screen ( show the population or not )
      if (window.screen.width <= 360) { // 768px portrait
        this.mobile = true;
      }
    })
  }

  //Sorts the table by the year field (two-way)
  sort () {
    //if sorted from big to little
    if(this.dataOfUSA[0]['ID Year']>this.dataOfUSA[this.dataOfUSA.length-1]['ID Year']){
      let dataSortedLittleToBig = this.dataOfUSA.sort((a:Idata,b:Idata) => (a['ID Year'] < b['ID Year']) ? -1 : ((b['ID Year'] > a['ID Year']) ? 1 : 0))
      this.dataOfUSA = dataSortedLittleToBig
    } else {
      let dataSortedBigToLittle = this.dataOfUSA.sort((a:Idata,b:Idata) => (a['ID Year'] > b['ID Year']) ? -1 : ((b['ID Year'] < a['ID Year']) ? 1 : 0))
      this.dataOfUSA = dataSortedBigToLittle
    }
  }

  //Colors the largest value in Population in red
  paint (data:Idata[]) {
    for(let x=0; x<data.length-1; x++){
      if(data[x+1].Population > data[x].Population){
        this.indexToPaintPopulation = x+1;
      }
    }
    console.log(this.indexToPaintPopulation)
  }

  //map the array to update the growth percentages
  updateTheGrowthPercentages(arrayBeforeCalculationOfGrowthPercentages:Idata[]){
    arrayBeforeCalculationOfGrowthPercentages[0]['Growth percentages'] = 100
      for( let x = 0; x < arrayBeforeCalculationOfGrowthPercentages.length-1; x++){
        arrayBeforeCalculationOfGrowthPercentages[x+1]['Growth percentages'] = 
        ( arrayBeforeCalculationOfGrowthPercentages[x+1].Population * 100 ) / arrayBeforeCalculationOfGrowthPercentages[x].Population;
        console.log( arrayBeforeCalculationOfGrowthPercentages[x+1]['ID Year'] +'   '+ arrayBeforeCalculationOfGrowthPercentages[x+1]['Growth percentages'])
      }
      return arrayBeforeCalculationOfGrowthPercentages;
  }
}
