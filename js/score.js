var Intervals = {};

function InitializeIntervals()
{
  var ctr = 0;

  for(var i in cereals_data[0])
  {
    if(ctr >= 4 && ctr <= 12)
    {
      var obj = {};
      obj.min   = cereals_data[0][i];
      obj.max   = cereals_data[0][i];
      obj.mean  = cereals_data[0][i];
      obj.count = 1;
      Intervals[i] = obj;
    }
    ctr++;
  }

  for(var i=1; i<cereals_data.length; i++)
  {
    for(var j in Intervals)
    {
      var current_value = cereals_data[i][j];
      if(current_value == -1) continue;
      if (current_value < Intervals[j]['min']) Intervals[j]['min'] = current_value;
      if (current_value > Intervals[j]['max']) Intervals[j]['max'] = current_value;
      Intervals[j]['count']++;

      // New Mean = (Old Mean * n + current) / n+1
      Intervals[j]['mean'] = (Intervals[j]['count']-1)*Intervals[j]['mean'];
      Intervals[j]['mean'] += current_value;
      Intervals[j]['mean'] /= Intervals[j]['count'];
    }
  }
}

InitializeIntervals();

function GetScore(index , preferences)
{
  var current_cereal = cereals_data[index];
  var score = 0;

  for(var i=0; i<preferences.length; i++)
  {
    // [A, B] --> [a, b]
    // (val - A) * (b - a) / (B- A) + a
    var A = Intervals[preferences[i]['criterion']]['min'];
    var B = Intervals[preferences[i]['criterion']]['max'];
    var a = 0;
    var b = 100;

    var wanted_percentage = (current_cereal[preferences[i]['criterion']] - A) * (b - a) / (B - A) + a;
    score += Math.pow((preferences[i]['choice'] - wanted_percentage), 2);
  }

  return score;

}

function GetBestCereal(preferences)
{
  var min = GetScore(0, preferences);
  var index = 0;
  for(var i=1; i<cereals_data.length; i++)
  {
    var cur_score = GetScore(i, preferences);
    if(cur_score < min) { min=cur_score; index=i;}
  }
  return cereals_data[index];
}

var pref = [{"criterion":"fiber", "choice":"50"}, {"criterion":"calories", "choice":"80"}];
console.log(GetBestCereal(pref));
