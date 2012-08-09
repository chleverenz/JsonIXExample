if (typeof biz === 'undefined') {
  biz = {};
}
if (typeof biz.leverenz === 'undefined') {
  biz.leverenz = {};
}
if (typeof biz.leverenz.clsimplexsd === 'undefined') {
  biz.leverenz.clsimplexsd = {};
}
if (!biz.leverenz.clsimplexsd.Mappings) {
  biz.leverenz.clsimplexsd.Mappings = {};
}
biz.leverenz.clsimplexsd.Myroot = new Jsonix.Model.ClassInfo({
    name: 'biz.leverenz.clsimplexsd.Myroot'
  });
biz.leverenz.clsimplexsd.Anentry = new Jsonix.Model.ClassInfo({
    name: 'biz.leverenz.clsimplexsd.Anentry'
  });