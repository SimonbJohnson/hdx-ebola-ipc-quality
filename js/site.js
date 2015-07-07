
function initDashboard(data){

    var color = "#EF5350";

    var orgChart = dc.rowChart('#org-chart');

    var geoChart = dc.rowChart('#geo-chart');

    var cf = crossfilter(data);

    var orgDimension = cf.dimension(function(d){return d['#org'];});

    var geoDimension = cf.dimension(function(d){return d['#adm2']})

    var orgGroup = orgDimension.group();

    var geoGroup = geoDimension.group()

    //var outputdurDimension = cf.dimension(function(d){return d['#output+duration'];});

     var average = function(d) {
      return d.count ? (1-d.bad / d.count) : 1;
    };

    var outputdurGroup = cf.groupAll().reduce(outputdurreduceAdd, outputdurreduceRemove, reduceInitial);

    var adm2Group = cf.groupAll().reduce(adm2reduceAdd, adm2reduceRemove, reduceInitial);

    var adm3Group = cf.groupAll().reduce(adm3reduceAdd, adm3reduceRemove, reduceInitial);

    var locGroup = cf.groupAll().reduce(locreduceAdd, locreduceRemove, reduceInitial);

    var statusGroup = cf.groupAll().reduce(statusreduceAdd, statusreduceRemove, reduceInitial);

    var geolatGroup = cf.groupAll().reduce(geolatreduceAdd, geolatreduceRemove, reduceInitial);

    var outtypeGroup = cf.groupAll().reduce(outtypereduceAdd, outtypereduceRemove, reduceInitial);      

    var outputnumGroup = cf.groupAll().reduce(outputnumreduceAdd, outputnumreduceRemove, reduceInitial);

    var statusfollowGroup = cf.groupAll().reduce(statusfollowreduceAdd, statusfollowreduceRemove, reduceInitial);

    var dateGroup = cf.groupAll().reduce(datereduceAdd, datereduceRemove, reduceInitial);

    var all = cf.groupAll();

    orgChart.width($('#org-chart').width()).height(500)
                .dimension(orgDimension)
                .group(orgGroup)
                .labelOffsetY(10)
                .colors([color])
                .colorAccessor(function(d, i){return 0;})
                .xAxis().ticks(5);

    geoChart.width($('#geo-chart').width()).height(500)
                .dimension(geoDimension)
                .group(geoGroup)
                .labelOffsetY(10)
                .colors([color])
                .colorAccessor(function(d, i){return 0;})
                .xAxis().ticks(5);                

    dc.numberDisplay('#outputdur-display')
      .formatNumber(d3.format("%"))
      .valueAccessor(average)
      .group(outputdurGroup)
      .renderlet(function(c){
        if(c.value()<0.5){
            d3.select('#outputdur-display').attr('class','red');
        } else if(c.value()<0.9) {
            d3.select('#outputdur-display').attr('class','orange');
        } else {
            d3.select('#outputdur-display').attr('class','green');
        }
      });

    dc.numberDisplay('#adm2-display')
      .formatNumber(d3.format("%"))
      .valueAccessor(average)
      .group(adm2Group)
        .renderlet(function(c){
        if(c.value()<0.5){
            d3.select('#adm2-display').attr('class','red');
        } else if(c.value()<0.9) {
            d3.select('#adm2-display').attr('class','orange');
        } else {
            d3.select('#adm2-display').attr('class','green');
        }
      });      

    dc.numberDisplay('#adm3-display')
      .formatNumber(d3.format("%"))
      .valueAccessor(average)
      .group(adm3Group)
        .renderlet(function(c){
        if(c.value()<0.5){
            d3.select('#adm3-display').attr('class','red');
        } else if(c.value()<0.9) {
            d3.select('#adm3-display').attr('class','orange');
        } else {
            d3.select('#adm3-display').attr('class','green');
        }
      });      

    dc.numberDisplay('#loc-display')
      .formatNumber(d3.format("%"))
      .valueAccessor(average)
      .group(locGroup)
        .renderlet(function(c){
        if(c.value()<0.5){
            d3.select('#loc-display').attr('class','red');
        } else if(c.value()<0.9) {
            d3.select('#loc-display').attr('class','orange');
        } else {
            d3.select('#loc-display').attr('class','green');
        }
      });      

    dc.numberDisplay('#status-display')
      .formatNumber(d3.format("%"))
      .valueAccessor(average)
      .group(statusGroup)
        .renderlet(function(c){
        if(c.value()<0.5){
            d3.select('#status-display').attr('class','red');
        } else if(c.value()<0.9) {
            d3.select('#status-display').attr('class','orange');
        } else {
            d3.select('#status-display').attr('class','green');
        }
      });         

    dc.numberDisplay('#geolat-display')
      .formatNumber(d3.format("%"))
      .valueAccessor(average)
      .group(geolatGroup)
        .renderlet(function(c){
        if(c.value()<0.5){
            d3.select('#geolat-display').attr('class','red');
        } else if(c.value()<0.9) {
            d3.select('#geolat-display').attr('class','orange');
        } else {
            d3.select('#geolat-display').attr('class','green');
        }
      });       

    dc.numberDisplay('#outtype-display')
      .formatNumber(d3.format("%"))
      .valueAccessor(average)
      .group(outtypeGroup)
        .renderlet(function(c){
        if(c.value()<0.5){
            d3.select('#outtype-display').attr('class','red');
        } else if(c.value()<0.9) {
            d3.select('#outtype-display').attr('class','orange');
        } else {
            d3.select('#outtype-display').attr('class','green');
        }
      });      

     dc.numberDisplay('#outputnum-display')
      .formatNumber(d3.format("%"))
      .valueAccessor(average)
      .group(outputnumGroup)
        .renderlet(function(c){
        if(c.value()<0.5){
            d3.select('#outputnum-display').attr('class','red');
        } else if(c.value()<0.9) {
            d3.select('#outputnum-display').attr('class','orange');
        } else {
            d3.select('#outputnum-display').attr('class','green');
        }
      });       
      
     dc.numberDisplay('#statusfollow-display')
      .formatNumber(d3.format("%"))
      .valueAccessor(average)
      .group(statusfollowGroup)
        .renderlet(function(c){
        if(c.value()<0.5){
            d3.select('#statusfollow-display').attr('class','red');
        } else if(c.value()<0.9) {
            d3.select('#statusfollow-display').attr('class','orange');
        } else {
            d3.select('#statusfollow-display').attr('class','green');
        }
      });

     dc.numberDisplay('#date-display')
      .formatNumber(d3.format("%"))
      .valueAccessor(average)
      .group(dateGroup)
        .renderlet(function(c){
        if(c.value()<0.5){
            d3.select('#date-display').attr('class','red');
        } else if(c.value()<0.9) {
            d3.select('#datefollow-display').attr('class','orange');
        } else {
            d3.select('#datefollow-display').attr('class','green');
        }
      });                                 

/*

    dc.dataCount('#count-info')
                .dimension(cf)
                .group(all);
*/

    dc.dataTable("#data-table")
                    .dimension(geoDimension)                
                    .group(function (d) {
                       return 0;
                    })
                    .size(650)
                    .columns([
                        function(d){
                            return d['#adm2'];
                        },
                        function(d){
                            return d['#adm3'];
                        },
                        function(d){
                            return d['#loc'];
                        },
                        function(d){
                            return d['#status+private'];
                        },
                        function(d){
                            return d['#geo+lat'];
                        },
                        function(d){
                            return d['#geo+lon'];
                        },
                        function(d){
                            return d['#org'];
                        },
                        function(d){
                            return d['#date'];
                        },
                        function(d){
                            return d['#output+duration'];
                        },
                        function(d){
                            return d['#output+type'];
                        },
                        function(d){
                            return d['#output+num'];
                        },
                        function(d){
                            return d['#status+followups'];
                        },                                                                                                                          
                    ])
                    .sortBy(function(d) {
                            return d["gsx$_ciyn3"];
                        })                
                    .renderlet(function (table) {
                        table.selectAll(".dc-table-group").classed("info", true);
                    });            

        dc.renderAll();       

    function reduceInitial() {
           return {
            count: 0,
            bad: 0,
        };
    }           

    function outputdurreduceAdd(p, v) {
        ++p.count;
        p.bad += (v['#output+duration'] == '' || v['#output+duration'] == null ? 1 : 0);
        return p;
    }
    
    function outputdurreduceRemove(p, v) {
        --p.count;
        p.bad -= (v['#output+duration'] == '' || v['#output+duration'] == null ? 1 : 0);
        return p;
    }
     
    function adm2reduceAdd(p, v) {
        ++p.count;
        p.bad += (v['#adm2'] == '' || v['#adm2'] == null ? 1 : 0);
        return p;
    }
    
    function adm2reduceRemove(p, v) {
        --p.count;
        p.bad -= (v['#adm2'] == '' || v['#adm2'] == null ? 1 : 0);
        return p;
    }

    function adm3reduceAdd(p, v) {
        ++p.count;
        p.bad += (v['#adm3'] == '' || v['#adm3'] == null ? 1 : 0);
        return p;
    }
    
    function adm3reduceRemove(p, v) {
        --p.count;
        p.bad -= (v['#adm3'] == '' || v['#adm3'] == null ? 1 : 0);
        return p;
    }
    function locreduceAdd(p, v) {
        ++p.count;
        p.bad += (v['#adm3'] == '' || v['#loc'] == null ? 1 : 0);
        return p;
    }
    
    function locreduceRemove(p, v) {
        --p.count;
        p.bad -= (v['#adm3'] == '' || v['#loc'] == null ? 1 : 0);
        return p;
    }

    function statusreduceAdd(p, v) {
        ++p.count;
        p.bad += (v['#status+private'] == '' || v['#status+private'] == null ? 1 : 0);
        return p;
    }
    
    function statusreduceRemove(p, v) {
        --p.count;
        p.bad -= (v['#status+private'] == '' || v['#status+private'] == null ? 1 : 0);
        return p;
    }
    function geolatreduceAdd(p, v) {
        ++p.count;
        p.bad += (v['#geo+lat'] == '' || v['#geo+lat'] == null ? 1 : 0);
        return p;
    }
    
    function geolatreduceRemove(p, v) {
        --p.count;
        p.bad -= (v['#geo+lat'] == '' || v['#geo+lat'] == null ? 1 : 0);
        return p;
    }

    function outtypereduceAdd(p, v) {
        ++p.count;
        p.bad += (v['#output+type'] == '' || v['#output+type'] == null ? 1 : 0);
        return p;
    }
    
    function outtypereduceRemove(p, v) {
        --p.count;
        p.bad -= (v['#output+type'] == '' || v['#output+type'] == null ? 1 : 0);
        return p;
    }

    function outputnumreduceAdd(p, v) {
        ++p.count;
        p.bad += (v['#output+num'] == '' || v['#output+num'] == null ? 1 : 0);
        return p;
    }
    
    function outputnumreduceRemove(p, v) {
        --p.count;
        p.bad -= (v['#output+num'] == '' || v['#output+num'] == null ? 1 : 0);
        return p;
    }

    function statusfollowreduceAdd(p, v) {
        ++p.count;
        p.bad += (v['#status+followups'] == '' || v['#status+followups'] == null ? 1 : 0);
        return p;
    }
    
    function statusfollowreduceRemove(p, v) {
        --p.count;
        p.bad -= (v['#status+followups'] == '' || v['#status+followups'] == null ? 1 : 0);
        return p;
    }

    function datereduceAdd(p, v) {
        ++p.count;
        p.bad += (v['#date'] == '' || v['#date'] == null || isNaN(parseInt(v['#date'].substring(1))) ? 1 : 0);
        return p;
    }
    
    function datereduceRemove(p, v) {
        --p.count;
        p.bad -= (v['#date'] == '' || v['#date'] == null || isNaN(parseInt(v['#date'].substring(1))) ? 1 : 0);
        return p;
    }                                 
}

initDashboard(data);