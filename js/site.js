function initDashboard(data){

    var color = "#EF5350";
    html='<div class="row">'
    data[0].forEach(function(e,i){
        if(i % 4==0&& i>0){
            html +='</div><div class="row">'
        } 
        html += '<div id="column'+i+'" class="col-md-3"><div class="title"><h4>'+e+'</h4></div><div id="display'+i+'"><p>Completed:</p></div><p>Top 20 chart</p></div>';
    });

    html += '</div>';

    $('#charts').html(html);

    var dcData = hxlProxyToDC(data);

    var cf = crossfilter(dcData);

    data[1].forEach(function(e,i){
        generateGraph('#column'+i,e,cf,i)
    })
    var all = cf.groupAll();

    dc.dataCount('#count-info')
        .dimension(cf)
        .group(all);

    dc.renderAll();

}


function generateGraph(id,key,cf,i){
    var chart = dc.rowChart(id);

    var average = function(d) {
      return d.count ? (1-d.bad / d.count) : 1;
    };

    chart.cfdimension = cf.dimension(function(d){return d[key];});
    chart.cfgroup = chart.cfdimension.group();

    chart.numberDisplay = dc.numberDisplay('#display'+i);

    chart.numberDisplay.cfgroup = cf.groupAll().reduce(buildReduceAdd(key),buildReduceRemove(key),reduceInitial);

    chart.numberDisplay.formatNumber(d3.format("%"))
      .valueAccessor(average)
      .group(chart.numberDisplay.cfgroup)
      .renderlet(function(c){
        if(c.value()<0.5){
            d3.select('#display'+i).attr('class','red');
        } else if(c.value()<0.9) {
            d3.select('#display'+i).attr('class','orange');
        } else {
            d3.select('#display'+i).attr('class','green');
        }
      });

    chart.width($(id).width()).height(500)
        .dimension(chart.cfdimension)
        .group(chart.cfgroup)
        .data(function(group) {
                return group.top(20);
        })
        .colors(['#64B5F6'])
        .colorAccessor(function(d, i){return 0;})
        .xAxis().ticks(4);



    return chart;
}

function hxlProxyToDC(input){
    var output = [];
    var keys=[]
    input.forEach(function(e,i){
        if(i==1){
            keys = e;
        } else if(i>1) {
            var row = {};
            e.forEach(function(e2,i2){
                row[keys[i2]] = e2;
            });
            output.push(row);
        }
    });
    return output;
}

function reduceInitial() {
    return {
        count: 0,
        bad: 0,
    };
}

function buildReduceAdd(index) {
    return function (p, v) {
        ++p.count;
        p.bad += (v[index] == '' || v[index] == null ? 1 : 0);
        return p;
    }
}

function buildReduceRemove(index) {
    return function (p, v) {
        console.log(p);
        --p.count;
        p.bad -= (v[index] == '' || v[index] == null ? 1 : 0);
        return p;
    }    
}

var url ='http://proxy.hxlstandard.org/data.json?filter_count=7&url=https%3A//docs.google.com/spreadsheets/u/0/d/1NfbnTHjBPxzvxssMSUpP-cPG0mIoa2rAM5VohJuTbpg/export%3Fformat%3Dcsv%26id%3D1NfbnTHjBPxzvxssMSUpP-cPG0mIoa2rAM5VohJuTbpg%26gid%3D0&format=html&filter01=cut&cut-include-tags01=&cut-exclude-tags01=%23adm1%2Bcode%2C%23adm2%2Bcode%2C%23adm3%2Bcode&filter02=&filter03=&filter04=&filter05=&filter06=&filter07=' ;
   
$.ajax(url, {
    success: function(data) {
        initDashboard(data);
    },
    error: function(e,error) {
        console.log(error);
    }
});