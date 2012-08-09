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
{
  {
    biz.leverenz.clsimplexsd.Myroot.properties = [new Jsonix.Model.ElementPropertyInfo({
          name: 'anentry',
          collection: true,
          elementName: new Jsonix.XML.QName('http:\/\/www.leverenz.biz\/clsimplexsd.xsd', 'anentry'),
          typeInfo: biz.leverenz.clsimplexsd.Anentry
        }), new Jsonix.Model.AttributePropertyInfo({
          name: 'defaultentry',
          typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
          attributeName: new Jsonix.XML.QName('defaultentry')
        })];
  }
  {
    biz.leverenz.clsimplexsd.Anentry.properties = [new Jsonix.Model.ElementPropertyInfo({
          name: 'astring',
          elementName: new Jsonix.XML.QName('http:\/\/www.leverenz.biz\/clsimplexsd.xsd', 'astring'),
          typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
          name: 'anumber',
          elementName: new Jsonix.XML.QName('http:\/\/www.leverenz.biz\/clsimplexsd.xsd', 'anumber'),
          typeInfo: Jsonix.Schema.XSD.Integer.INSTANCE
        }), new Jsonix.Model.AttributePropertyInfo({
          name: 'name',
          typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
          attributeName: new Jsonix.XML.QName('name')
        }), new Jsonix.Model.AttributePropertyInfo({
          name: 'useme',
          typeInfo: Jsonix.Schema.XSD.Boolean.INSTANCE,
          attributeName: new Jsonix.XML.QName('useme')
        }), new Jsonix.Model.AttributePropertyInfo({
          name: 'maxcount',
          typeInfo: Jsonix.Schema.XSD.Integer.INSTANCE,
          attributeName: new Jsonix.XML.QName('maxcount')
        })];
  }
}
biz.leverenz.clsimplexsd.Mappings.elementInfos = [{
    elementName: new Jsonix.XML.QName('http:\/\/www.leverenz.biz\/clsimplexsd.xsd', 'myroot'),
    typeInfo: biz.leverenz.clsimplexsd.Myroot
  }];