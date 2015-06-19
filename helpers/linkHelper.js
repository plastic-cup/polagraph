module.exports = function(context){
  console.log('####', context.data.root.link);
  return '<a id ="login" href="/' + context.data.root.link.toLowerCase() + '">' + context.data.root.link + "</a>";
};
