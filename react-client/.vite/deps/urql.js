import {
  __toESM,
  require_react
} from "./chunk-UPDK7Z2H.js";

// node_modules/@0no-co/graphql.web/dist/graphql.web.mjs
var e = {
  NAME: "Name",
  DOCUMENT: "Document",
  OPERATION_DEFINITION: "OperationDefinition",
  VARIABLE_DEFINITION: "VariableDefinition",
  SELECTION_SET: "SelectionSet",
  FIELD: "Field",
  ARGUMENT: "Argument",
  FRAGMENT_SPREAD: "FragmentSpread",
  INLINE_FRAGMENT: "InlineFragment",
  FRAGMENT_DEFINITION: "FragmentDefinition",
  VARIABLE: "Variable",
  INT: "IntValue",
  FLOAT: "FloatValue",
  STRING: "StringValue",
  BOOLEAN: "BooleanValue",
  NULL: "NullValue",
  ENUM: "EnumValue",
  LIST: "ListValue",
  OBJECT: "ObjectValue",
  OBJECT_FIELD: "ObjectField",
  DIRECTIVE: "Directive",
  NAMED_TYPE: "NamedType",
  LIST_TYPE: "ListType",
  NON_NULL_TYPE: "NonNullType"
};
var GraphQLError = class extends Error {
  constructor(e3, r3, i3, n2, a2, t2, o2) {
    super(e3);
    this.name = "GraphQLError";
    this.message = e3;
    if (a2) {
      this.path = a2;
    }
    if (r3) {
      this.nodes = Array.isArray(r3) ? r3 : [r3];
    }
    if (i3) {
      this.source = i3;
    }
    if (n2) {
      this.positions = n2;
    }
    if (t2) {
      this.originalError = t2;
    }
    var l4 = o2;
    if (!l4 && t2) {
      var u3 = t2.extensions;
      if (u3 && "object" == typeof u3) {
        l4 = u3;
      }
    }
    this.extensions = l4 || {};
  }
  toJSON() {
    return {
      ...this,
      message: this.message
    };
  }
  toString() {
    return this.message;
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
};
var i;
var n;
function error(e3) {
  return new GraphQLError(`Syntax Error: Unexpected token at ${n} in ${e3}`);
}
function advance(e3) {
  e3.lastIndex = n;
  if (e3.test(i)) {
    return i.slice(n, n = e3.lastIndex);
  }
}
var a = / +(?=[^\s])/y;
function blockString(e3) {
  var r3 = e3.split("\n");
  var i3 = "";
  var n2 = 0;
  var t2 = 0;
  var o2 = r3.length - 1;
  for (var l4 = 0; l4 < r3.length; l4++) {
    a.lastIndex = 0;
    if (a.test(r3[l4])) {
      if (l4 && (!n2 || a.lastIndex < n2)) {
        n2 = a.lastIndex;
      }
      t2 = t2 || l4;
      o2 = l4;
    }
  }
  for (var u3 = t2; u3 <= o2; u3++) {
    if (u3 !== t2) {
      i3 += "\n";
    }
    i3 += r3[u3].slice(n2).replace(/\\"""/g, '"""');
  }
  return i3;
}
function ignored() {
  for (var e3 = 0 | i.charCodeAt(n++); 9 === e3 || 10 === e3 || 13 === e3 || 32 === e3 || 35 === e3 || 44 === e3 || 65279 === e3; e3 = 0 | i.charCodeAt(n++)) {
    if (35 === e3) {
      while (10 !== (e3 = i.charCodeAt(n++)) && 13 !== e3) {
      }
    }
  }
  n--;
}
var t = /[_A-Za-z]\w*/y;
function name() {
  var e3;
  if (e3 = advance(t)) {
    return {
      kind: "Name",
      value: e3
    };
  }
}
var o = /(?:null|true|false)/y;
var l = /\$[_A-Za-z]\w*/y;
var u = /-?\d+/y;
var v = /(?:\.\d+)?[eE][+-]?\d+|\.\d+/y;
var d = /\\/g;
var s = /"""(?:"""|(?:[\s\S]*?[^\\])""")/y;
var c = /"(?:"|[^\r\n]*?[^\\]")/y;
function value(e3) {
  var r3;
  var a2;
  if (a2 = advance(o)) {
    r3 = "null" === a2 ? {
      kind: "NullValue"
    } : {
      kind: "BooleanValue",
      value: "true" === a2
    };
  } else if (!e3 && (a2 = advance(l))) {
    r3 = {
      kind: "Variable",
      name: {
        kind: "Name",
        value: a2.slice(1)
      }
    };
  } else if (a2 = advance(u)) {
    var f4 = a2;
    if (a2 = advance(v)) {
      r3 = {
        kind: "FloatValue",
        value: f4 + a2
      };
    } else {
      r3 = {
        kind: "IntValue",
        value: f4
      };
    }
  } else if (a2 = advance(t)) {
    r3 = {
      kind: "EnumValue",
      value: a2
    };
  } else if (a2 = advance(s)) {
    r3 = {
      kind: "StringValue",
      value: blockString(a2.slice(3, -3)),
      block: true
    };
  } else if (a2 = advance(c)) {
    r3 = {
      kind: "StringValue",
      value: d.test(a2) ? JSON.parse(a2) : a2.slice(1, -1),
      block: false
    };
  } else if (r3 = function list(e4) {
    var r4;
    if (91 === i.charCodeAt(n)) {
      n++;
      ignored();
      var a3 = [];
      while (r4 = value(e4)) {
        a3.push(r4);
      }
      if (93 !== i.charCodeAt(n++)) {
        throw error("ListValue");
      }
      ignored();
      return {
        kind: "ListValue",
        values: a3
      };
    }
  }(e3) || function object(e4) {
    if (123 === i.charCodeAt(n)) {
      n++;
      ignored();
      var r4 = [];
      var a3;
      while (a3 = name()) {
        ignored();
        if (58 !== i.charCodeAt(n++)) {
          throw error("ObjectField");
        }
        ignored();
        var t2 = value(e4);
        if (!t2) {
          throw error("ObjectField");
        }
        r4.push({
          kind: "ObjectField",
          name: a3,
          value: t2
        });
      }
      if (125 !== i.charCodeAt(n++)) {
        throw error("ObjectValue");
      }
      ignored();
      return {
        kind: "ObjectValue",
        fields: r4
      };
    }
  }(e3)) {
    return r3;
  }
  ignored();
  return r3;
}
function arguments_(e3) {
  var r3 = [];
  ignored();
  if (40 === i.charCodeAt(n)) {
    n++;
    ignored();
    var a2;
    while (a2 = name()) {
      ignored();
      if (58 !== i.charCodeAt(n++)) {
        throw error("Argument");
      }
      ignored();
      var t2 = value(e3);
      if (!t2) {
        throw error("Argument");
      }
      r3.push({
        kind: "Argument",
        name: a2,
        value: t2
      });
    }
    if (!r3.length || 41 !== i.charCodeAt(n++)) {
      throw error("Argument");
    }
    ignored();
  }
  return r3;
}
function directives(e3) {
  var r3 = [];
  ignored();
  while (64 === i.charCodeAt(n)) {
    n++;
    var a2 = name();
    if (!a2) {
      throw error("Directive");
    }
    ignored();
    r3.push({
      kind: "Directive",
      name: a2,
      arguments: arguments_(e3)
    });
  }
  return r3;
}
function field() {
  var e3 = name();
  if (e3) {
    ignored();
    var r3;
    if (58 === i.charCodeAt(n)) {
      n++;
      ignored();
      r3 = e3;
      if (!(e3 = name())) {
        throw error("Field");
      }
      ignored();
    }
    return {
      kind: "Field",
      alias: r3,
      name: e3,
      arguments: arguments_(false),
      directives: directives(false),
      selectionSet: selectionSet()
    };
  }
}
function type() {
  var e3;
  ignored();
  if (91 === i.charCodeAt(n)) {
    n++;
    ignored();
    var r3 = type();
    if (!r3 || 93 !== i.charCodeAt(n++)) {
      throw error("ListType");
    }
    e3 = {
      kind: "ListType",
      type: r3
    };
  } else if (e3 = name()) {
    e3 = {
      kind: "NamedType",
      name: e3
    };
  } else {
    throw error("NamedType");
  }
  ignored();
  if (33 === i.charCodeAt(n)) {
    n++;
    ignored();
    return {
      kind: "NonNullType",
      type: e3
    };
  } else {
    return e3;
  }
}
var f = /on/y;
function typeCondition() {
  if (advance(f)) {
    ignored();
    var e3 = name();
    if (!e3) {
      throw error("NamedType");
    }
    ignored();
    return {
      kind: "NamedType",
      name: e3
    };
  }
}
var p = /\.\.\./y;
function fragmentSpread() {
  if (advance(p)) {
    ignored();
    var e3 = n;
    var r3;
    if ((r3 = name()) && "on" !== r3.value) {
      return {
        kind: "FragmentSpread",
        name: r3,
        directives: directives(false)
      };
    } else {
      n = e3;
      var i3 = typeCondition();
      var a2 = directives(false);
      var t2 = selectionSet();
      if (!t2) {
        throw error("InlineFragment");
      }
      return {
        kind: "InlineFragment",
        typeCondition: i3,
        directives: a2,
        selectionSet: t2
      };
    }
  }
}
function selectionSet() {
  var e3;
  ignored();
  if (123 === i.charCodeAt(n)) {
    n++;
    ignored();
    var r3 = [];
    while (e3 = fragmentSpread() || field()) {
      r3.push(e3);
    }
    if (!r3.length || 125 !== i.charCodeAt(n++)) {
      throw error("SelectionSet");
    }
    ignored();
    return {
      kind: "SelectionSet",
      selections: r3
    };
  }
}
var m = /fragment/y;
function fragmentDefinition() {
  if (advance(m)) {
    ignored();
    var e3 = name();
    if (!e3) {
      throw error("FragmentDefinition");
    }
    ignored();
    var r3 = typeCondition();
    if (!r3) {
      throw error("FragmentDefinition");
    }
    var i3 = directives(false);
    var n2 = selectionSet();
    if (!n2) {
      throw error("FragmentDefinition");
    }
    return {
      kind: "FragmentDefinition",
      name: e3,
      typeCondition: r3,
      directives: i3,
      selectionSet: n2
    };
  }
}
var g = /(?:query|mutation|subscription)/y;
function operationDefinition() {
  var e3;
  var r3;
  var a2 = [];
  var t2 = [];
  if (e3 = advance(g)) {
    ignored();
    r3 = name();
    a2 = function variableDefinitions() {
      var e4;
      var r4 = [];
      ignored();
      if (40 === i.charCodeAt(n)) {
        n++;
        ignored();
        while (e4 = advance(l)) {
          ignored();
          if (58 !== i.charCodeAt(n++)) {
            throw error("VariableDefinition");
          }
          var a3 = type();
          var t3 = void 0;
          if (61 === i.charCodeAt(n)) {
            n++;
            ignored();
            if (!(t3 = value(true))) {
              throw error("VariableDefinition");
            }
          }
          ignored();
          r4.push({
            kind: "VariableDefinition",
            variable: {
              kind: "Variable",
              name: {
                kind: "Name",
                value: e4.slice(1)
              }
            },
            type: a3,
            defaultValue: t3,
            directives: directives(true)
          });
        }
        if (41 !== i.charCodeAt(n++)) {
          throw error("VariableDefinition");
        }
        ignored();
      }
      return r4;
    }();
    t2 = directives(false);
  }
  var o2 = selectionSet();
  if (o2) {
    return {
      kind: "OperationDefinition",
      operation: e3 || "query",
      name: r3,
      variableDefinitions: a2,
      directives: t2,
      selectionSet: o2
    };
  }
}
function parse(e3, r3) {
  i = "string" == typeof e3.body ? e3.body : e3;
  n = 0;
  return function document() {
    var e4;
    ignored();
    var r4 = [];
    while (e4 = fragmentDefinition() || operationDefinition()) {
      r4.push(e4);
    }
    return {
      kind: "Document",
      definitions: r4
    };
  }();
}
function printString(e3) {
  return JSON.stringify(e3);
}
function printBlockString(e3) {
  return '"""\n' + e3.replace(/"""/g, '\\"""') + '\n"""';
}
var hasItems = (e3) => !(!e3 || !e3.length);
var y = {
  OperationDefinition(e3) {
    if ("query" === e3.operation && !e3.name && !hasItems(e3.variableDefinitions) && !hasItems(e3.directives)) {
      return y.SelectionSet(e3.selectionSet);
    }
    var r3 = e3.operation;
    if (e3.name) {
      r3 += " " + e3.name.value;
    }
    if (hasItems(e3.variableDefinitions)) {
      if (!e3.name) {
        r3 += " ";
      }
      r3 += "(" + e3.variableDefinitions.map(y.VariableDefinition).join(", ") + ")";
    }
    if (hasItems(e3.directives)) {
      r3 += " " + e3.directives.map(y.Directive).join(" ");
    }
    return r3 + " " + y.SelectionSet(e3.selectionSet);
  },
  VariableDefinition(e3) {
    var r3 = y.Variable(e3.variable) + ": " + print(e3.type);
    if (e3.defaultValue) {
      r3 += " = " + print(e3.defaultValue);
    }
    if (hasItems(e3.directives)) {
      r3 += " " + e3.directives.map(y.Directive).join(" ");
    }
    return r3;
  },
  Field(e3) {
    var r3 = (e3.alias ? e3.alias.value + ": " : "") + e3.name.value;
    if (hasItems(e3.arguments)) {
      var i3 = e3.arguments.map(y.Argument);
      var n2 = r3 + "(" + i3.join(", ") + ")";
      r3 = n2.length > 80 ? r3 + "(\n  " + i3.join("\n").replace(/\n/g, "\n  ") + "\n)" : n2;
    }
    if (hasItems(e3.directives)) {
      r3 += " " + e3.directives.map(y.Directive).join(" ");
    }
    return e3.selectionSet ? r3 + " " + y.SelectionSet(e3.selectionSet) : r3;
  },
  StringValue: (e3) => e3.block ? printBlockString(e3.value) : printString(e3.value),
  BooleanValue: (e3) => "" + e3.value,
  NullValue: (e3) => "null",
  IntValue: (e3) => e3.value,
  FloatValue: (e3) => e3.value,
  EnumValue: (e3) => e3.value,
  Name: (e3) => e3.value,
  Variable: (e3) => "$" + e3.name.value,
  ListValue: (e3) => "[" + e3.values.map(print).join(", ") + "]",
  ObjectValue: (e3) => "{" + e3.fields.map(y.ObjectField).join(", ") + "}",
  ObjectField: (e3) => e3.name.value + ": " + print(e3.value),
  Document: (e3) => hasItems(e3.definitions) ? e3.definitions.map(print).join("\n\n") : "",
  SelectionSet: (e3) => "{\n  " + e3.selections.map(print).join("\n").replace(/\n/g, "\n  ") + "\n}",
  Argument: (e3) => e3.name.value + ": " + print(e3.value),
  FragmentSpread(e3) {
    var r3 = "..." + e3.name.value;
    if (hasItems(e3.directives)) {
      r3 += " " + e3.directives.map(y.Directive).join(" ");
    }
    return r3;
  },
  InlineFragment(e3) {
    var r3 = "...";
    if (e3.typeCondition) {
      r3 += " on " + e3.typeCondition.name.value;
    }
    if (hasItems(e3.directives)) {
      r3 += " " + e3.directives.map(y.Directive).join(" ");
    }
    return r3 + " " + print(e3.selectionSet);
  },
  FragmentDefinition(e3) {
    var r3 = "fragment " + e3.name.value;
    r3 += " on " + e3.typeCondition.name.value;
    if (hasItems(e3.directives)) {
      r3 += " " + e3.directives.map(y.Directive).join(" ");
    }
    return r3 + " " + print(e3.selectionSet);
  },
  Directive(e3) {
    var r3 = "@" + e3.name.value;
    if (hasItems(e3.arguments)) {
      r3 += "(" + e3.arguments.map(y.Argument).join(", ") + ")";
    }
    return r3;
  },
  NamedType: (e3) => e3.name.value,
  ListType: (e3) => "[" + print(e3.type) + "]",
  NonNullType: (e3) => print(e3.type) + "!"
};
function print(e3) {
  return y[e3.kind] ? y[e3.kind](e3) : "";
}

// node_modules/wonka/dist/wonka.mjs
var teardownPlaceholder = () => {
};
var e2 = teardownPlaceholder;
function start(e3) {
  return {
    tag: 0,
    0: e3
  };
}
function push(e3) {
  return {
    tag: 1,
    0: e3
  };
}
var asyncIteratorSymbol = () => "function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator";
var identity = (e3) => e3;
function filter(r3) {
  return (t2) => (i3) => {
    var a2 = e2;
    t2((e3) => {
      if (0 === e3) {
        i3(0);
      } else if (0 === e3.tag) {
        a2 = e3[0];
        i3(e3);
      } else if (!r3(e3[0])) {
        a2(0);
      } else {
        i3(e3);
      }
    });
  };
}
function map(e3) {
  return (r3) => (t2) => r3((r4) => {
    if (0 === r4 || 0 === r4.tag) {
      t2(r4);
    } else {
      t2(push(e3(r4[0])));
    }
  });
}
function mergeMap(r3) {
  return (t2) => (i3) => {
    var a2 = [];
    var f4 = e2;
    var n2 = false;
    var s2 = false;
    t2((t3) => {
      if (s2) {
      } else if (0 === t3) {
        s2 = true;
        if (!a2.length) {
          i3(0);
        }
      } else if (0 === t3.tag) {
        f4 = t3[0];
      } else {
        n2 = false;
        !function applyInnerSource(r4) {
          var t4 = e2;
          r4((e3) => {
            if (0 === e3) {
              if (a2.length) {
                var r5 = a2.indexOf(t4);
                if (r5 > -1) {
                  (a2 = a2.slice()).splice(r5, 1);
                }
                if (!a2.length) {
                  if (s2) {
                    i3(0);
                  } else if (!n2) {
                    n2 = true;
                    f4(0);
                  }
                }
              }
            } else if (0 === e3.tag) {
              a2.push(t4 = e3[0]);
              t4(0);
            } else if (a2.length) {
              i3(e3);
              t4(0);
            }
          });
        }(r3(t3[0]));
        if (!n2) {
          n2 = true;
          f4(0);
        }
      }
    });
    i3(start((e3) => {
      if (1 === e3) {
        if (!s2) {
          s2 = true;
          f4(1);
        }
        for (var r4 = 0, t3 = a2, i4 = a2.length; r4 < i4; r4++) {
          t3[r4](1);
        }
        a2.length = 0;
      } else {
        if (!s2 && !n2) {
          n2 = true;
          f4(0);
        } else {
          n2 = false;
        }
        for (var l4 = 0, u3 = a2, o2 = a2.length; l4 < o2; l4++) {
          u3[l4](0);
        }
      }
    }));
  };
}
function mergeAll(e3) {
  return mergeMap(identity)(e3);
}
function merge(e3) {
  return mergeAll(r(e3));
}
function onEnd(e3) {
  return (r3) => (t2) => {
    var i3 = false;
    r3((r4) => {
      if (i3) {
      } else if (0 === r4) {
        i3 = true;
        t2(0);
        e3();
      } else if (0 === r4.tag) {
        var a2 = r4[0];
        t2(start((r5) => {
          if (1 === r5) {
            i3 = true;
            a2(1);
            e3();
          } else {
            a2(r5);
          }
        }));
      } else {
        t2(r4);
      }
    });
  };
}
function onPush(e3) {
  return (r3) => (t2) => {
    var i3 = false;
    r3((r4) => {
      if (i3) {
      } else if (0 === r4) {
        i3 = true;
        t2(0);
      } else if (0 === r4.tag) {
        var a2 = r4[0];
        t2(start((e4) => {
          if (1 === e4) {
            i3 = true;
          }
          a2(e4);
        }));
      } else {
        e3(r4[0]);
        t2(r4);
      }
    });
  };
}
function onStart(e3) {
  return (r3) => (t2) => r3((r4) => {
    if (0 === r4) {
      t2(0);
    } else if (0 === r4.tag) {
      t2(r4);
      e3();
    } else {
      t2(r4);
    }
  });
}
function share(r3) {
  var t2 = [];
  var i3 = e2;
  var a2 = false;
  return (e3) => {
    t2.push(e3);
    if (1 === t2.length) {
      r3((e4) => {
        if (0 === e4) {
          for (var r4 = 0, f4 = t2, n2 = t2.length; r4 < n2; r4++) {
            f4[r4](0);
          }
          t2.length = 0;
        } else if (0 === e4.tag) {
          i3 = e4[0];
        } else {
          a2 = false;
          for (var s2 = 0, l4 = t2, u3 = t2.length; s2 < u3; s2++) {
            l4[s2](e4);
          }
        }
      });
    }
    e3(start((r4) => {
      if (1 === r4) {
        var f4 = t2.indexOf(e3);
        if (f4 > -1) {
          (t2 = t2.slice()).splice(f4, 1);
        }
        if (!t2.length) {
          i3(1);
        }
      } else if (!a2) {
        a2 = true;
        i3(0);
      }
    }));
  };
}
function switchMap(r3) {
  return (t2) => (i3) => {
    var a2 = e2;
    var f4 = e2;
    var n2 = false;
    var s2 = false;
    var l4 = false;
    var u3 = false;
    t2((t3) => {
      if (u3) {
      } else if (0 === t3) {
        u3 = true;
        if (!l4) {
          i3(0);
        }
      } else if (0 === t3.tag) {
        a2 = t3[0];
      } else {
        if (l4) {
          f4(1);
          f4 = e2;
        }
        if (!n2) {
          n2 = true;
          a2(0);
        } else {
          n2 = false;
        }
        !function applyInnerSource(e3) {
          l4 = true;
          e3((e4) => {
            if (!l4) {
            } else if (0 === e4) {
              l4 = false;
              if (u3) {
                i3(0);
              } else if (!n2) {
                n2 = true;
                a2(0);
              }
            } else if (0 === e4.tag) {
              s2 = false;
              (f4 = e4[0])(0);
            } else {
              i3(e4);
              if (!s2) {
                f4(0);
              } else {
                s2 = false;
              }
            }
          });
        }(r3(t3[0]));
      }
    });
    i3(start((e3) => {
      if (1 === e3) {
        if (!u3) {
          u3 = true;
          a2(1);
        }
        if (l4) {
          l4 = false;
          f4(1);
        }
      } else {
        if (!u3 && !n2) {
          n2 = true;
          a2(0);
        }
        if (l4 && !s2) {
          s2 = true;
          f4(0);
        }
      }
    }));
  };
}
function take(r3) {
  return (t2) => (i3) => {
    var a2 = e2;
    var f4 = false;
    var n2 = 0;
    t2((e3) => {
      if (f4) {
      } else if (0 === e3) {
        f4 = true;
        i3(0);
      } else if (0 === e3.tag) {
        if (r3 <= 0) {
          f4 = true;
          i3(0);
          e3[0](1);
        } else {
          a2 = e3[0];
        }
      } else if (n2++ < r3) {
        i3(e3);
        if (!f4 && n2 >= r3) {
          f4 = true;
          i3(0);
          a2(1);
        }
      } else {
        i3(e3);
      }
    });
    i3(start((e3) => {
      if (1 === e3 && !f4) {
        f4 = true;
        a2(1);
      } else if (0 === e3 && !f4 && n2 < r3) {
        a2(0);
      }
    }));
  };
}
function takeUntil(r3) {
  return (t2) => (i3) => {
    var a2 = e2;
    var f4 = e2;
    var n2 = false;
    t2((e3) => {
      if (n2) {
      } else if (0 === e3) {
        n2 = true;
        f4(1);
        i3(0);
      } else if (0 === e3.tag) {
        a2 = e3[0];
        r3((e4) => {
          if (0 === e4) {
          } else if (0 === e4.tag) {
            (f4 = e4[0])(0);
          } else {
            n2 = true;
            f4(1);
            a2(1);
            i3(0);
          }
        });
      } else {
        i3(e3);
      }
    });
    i3(start((e3) => {
      if (1 === e3 && !n2) {
        n2 = true;
        a2(1);
        f4(1);
      } else if (!n2) {
        a2(0);
      }
    }));
  };
}
function takeWhile(r3, t2) {
  return (i3) => (a2) => {
    var f4 = e2;
    var n2 = false;
    i3((e3) => {
      if (n2) {
      } else if (0 === e3) {
        n2 = true;
        a2(0);
      } else if (0 === e3.tag) {
        f4 = e3[0];
        a2(e3);
      } else if (!r3(e3[0])) {
        n2 = true;
        if (t2) {
          a2(e3);
        }
        a2(0);
        f4(1);
      } else {
        a2(e3);
      }
    });
  };
}
function lazy(e3) {
  return (r3) => e3()(r3);
}
function fromAsyncIterable(e3) {
  return (r3) => {
    var t2 = e3[asyncIteratorSymbol()] && e3[asyncIteratorSymbol()]() || e3;
    var i3 = false;
    var a2 = false;
    var f4 = false;
    var n2;
    r3(start(async (e4) => {
      if (1 === e4) {
        i3 = true;
        if (t2.return) {
          t2.return();
        }
      } else if (a2) {
        f4 = true;
      } else {
        for (f4 = a2 = true; f4 && !i3; ) {
          if ((n2 = await t2.next()).done) {
            i3 = true;
            if (t2.return) {
              await t2.return();
            }
            r3(0);
          } else {
            try {
              f4 = false;
              r3(push(n2.value));
            } catch (e5) {
              if (t2.throw) {
                if (i3 = !!(await t2.throw(e5)).done) {
                  r3(0);
                }
              } else {
                throw e5;
              }
            }
          }
        }
        a2 = false;
      }
    }));
  };
}
function fromIterable(e3) {
  if (e3[Symbol.asyncIterator]) {
    return fromAsyncIterable(e3);
  }
  return (r3) => {
    var t2 = e3[Symbol.iterator]();
    var i3 = false;
    var a2 = false;
    var f4 = false;
    var n2;
    r3(start((e4) => {
      if (1 === e4) {
        i3 = true;
        if (t2.return) {
          t2.return();
        }
      } else if (a2) {
        f4 = true;
      } else {
        for (f4 = a2 = true; f4 && !i3; ) {
          if ((n2 = t2.next()).done) {
            i3 = true;
            if (t2.return) {
              t2.return();
            }
            r3(0);
          } else {
            try {
              f4 = false;
              r3(push(n2.value));
            } catch (e5) {
              if (t2.throw) {
                if (i3 = !!t2.throw(e5).done) {
                  r3(0);
                }
              } else {
                throw e5;
              }
            }
          }
        }
        a2 = false;
      }
    }));
  };
}
var r = fromIterable;
function fromValue(e3) {
  return (r3) => {
    var t2 = false;
    r3(start((i3) => {
      if (1 === i3) {
        t2 = true;
      } else if (!t2) {
        t2 = true;
        r3(push(e3));
        r3(0);
      }
    }));
  };
}
function make(e3) {
  return (r3) => {
    var t2 = false;
    var i3 = e3({
      next(e4) {
        if (!t2) {
          r3(push(e4));
        }
      },
      complete() {
        if (!t2) {
          t2 = true;
          r3(0);
        }
      }
    });
    r3(start((e4) => {
      if (1 === e4 && !t2) {
        t2 = true;
        i3();
      }
    }));
  };
}
function makeSubject() {
  var e3;
  var r3;
  return {
    source: share(make((t2) => {
      e3 = t2.next;
      r3 = t2.complete;
      return teardownPlaceholder;
    })),
    next(r4) {
      if (e3) {
        e3(r4);
      }
    },
    complete() {
      if (r3) {
        r3();
      }
    }
  };
}
function fromPromise(e3) {
  return make((r3) => {
    e3.then((e4) => {
      Promise.resolve(e4).then(() => {
        r3.next(e4);
        r3.complete();
      });
    });
    return teardownPlaceholder;
  });
}
function subscribe(r3) {
  return (t2) => {
    var i3 = e2;
    var a2 = false;
    t2((e3) => {
      if (0 === e3) {
        a2 = true;
      } else if (0 === e3.tag) {
        (i3 = e3[0])(0);
      } else if (!a2) {
        r3(e3[0]);
        i3(0);
      }
    });
    return {
      unsubscribe() {
        if (!a2) {
          a2 = true;
          i3(1);
        }
      }
    };
  };
}
function publish(e3) {
  subscribe((e4) => {
  })(e3);
}
function toPromise(r3) {
  return new Promise((t2) => {
    var i3 = e2;
    var a2;
    r3((e3) => {
      if (0 === e3) {
        Promise.resolve(a2).then(t2);
      } else if (0 === e3.tag) {
        (i3 = e3[0])(0);
      } else {
        a2 = e3[0];
        i3(0);
      }
    });
  });
}

// node_modules/@urql/core/dist/urql-core-chunk.mjs
var rehydrateGraphQlError = (e3) => {
  if (e3 && e3.message && (e3.extensions || "GraphQLError" === e3.name)) {
    return e3;
  } else if ("object" == typeof e3 && e3.message) {
    return new GraphQLError(e3.message, e3.nodes, e3.source, e3.positions, e3.path, e3, e3.extensions || {});
  } else {
    return new GraphQLError(e3);
  }
};
var CombinedError = class extends Error {
  constructor(r3) {
    var e3 = (r3.graphQLErrors || []).map(rehydrateGraphQlError);
    var t2 = ((r4, e4) => {
      var t3 = "";
      if (r4) {
        return `[Network] ${r4.message}`;
      }
      if (e4) {
        for (var a2 of e4) {
          if (t3) {
            t3 += "\n";
          }
          t3 += `[GraphQL] ${a2.message}`;
        }
      }
      return t3;
    })(r3.networkError, e3);
    super(t2);
    this.name = "CombinedError";
    this.message = t2;
    this.graphQLErrors = e3;
    this.networkError = r3.networkError;
    this.response = r3.response;
  }
  toString() {
    return this.message;
  }
};
var phash = (r3, e3) => {
  var t2 = 0 | (e3 || 5381);
  for (var a2 = 0, o2 = 0 | r3.length; a2 < o2; a2++) {
    t2 = (t2 << 5) + t2 + r3.charCodeAt(a2);
  }
  return t2;
};
var i2 = /* @__PURE__ */ new Set();
var f2 = /* @__PURE__ */ new WeakMap();
var stringify = (r3) => {
  if (null === r3 || i2.has(r3)) {
    return "null";
  } else if ("object" != typeof r3) {
    return JSON.stringify(r3) || "";
  } else if (r3.toJSON) {
    return stringify(r3.toJSON());
  } else if (Array.isArray(r3)) {
    var e3 = "[";
    for (var t2 of r3) {
      if (e3.length > 1) {
        e3 += ",";
      }
      e3 += stringify(t2) || "null";
    }
    return e3 += "]";
  } else if (v2 !== NoopConstructor && r3 instanceof v2 || l2 !== NoopConstructor && r3 instanceof l2) {
    return "null";
  }
  var a2 = Object.keys(r3).sort();
  if (!a2.length && r3.constructor && Object.getPrototypeOf(r3).constructor !== Object.prototype.constructor) {
    var o2 = f2.get(r3) || Math.random().toString(36).slice(2);
    f2.set(r3, o2);
    return stringify({
      __key: o2
    });
  }
  i2.add(r3);
  var n2 = "{";
  for (var s2 of a2) {
    var c4 = stringify(r3[s2]);
    if (c4) {
      if (n2.length > 1) {
        n2 += ",";
      }
      n2 += stringify(s2) + ":" + c4;
    }
  }
  i2.delete(r3);
  return n2 += "}";
};
var extract = (r3, e3, t2) => {
  if (null == t2 || "object" != typeof t2 || t2.toJSON || i2.has(t2)) {
  } else if (Array.isArray(t2)) {
    for (var a2 = 0, o2 = t2.length; a2 < o2; a2++) {
      extract(r3, `${e3}.${a2}`, t2[a2]);
    }
  } else if (t2 instanceof v2 || t2 instanceof l2) {
    r3.set(e3, t2);
  } else {
    i2.add(t2);
    for (var n2 of Object.keys(t2)) {
      extract(r3, `${e3}.${n2}`, t2[n2]);
    }
  }
};
var stringifyVariables = (r3) => {
  i2.clear();
  return stringify(r3);
};
var NoopConstructor = class {
};
var v2 = "undefined" != typeof File ? File : NoopConstructor;
var l2 = "undefined" != typeof Blob ? Blob : NoopConstructor;
var c2 = /("{3}[\s\S]*"{3}|"(?:\\.|[^"])*")/g;
var p2 = /(?:#[^\n\r]+)?(?:[\r\n]+|$)/g;
var replaceOutsideStrings = (r3, e3) => e3 % 2 == 0 ? r3.replace(p2, "\n") : r3;
var sanitizeDocument = (r3) => r3.split(c2).map(replaceOutsideStrings).join("").trim();
var d2 = /* @__PURE__ */ new Map();
var u2 = /* @__PURE__ */ new Map();
var stringifyDocument = (r3) => {
  var t2;
  if ("string" == typeof r3) {
    t2 = sanitizeDocument(r3);
  } else if (r3.loc && u2.get(r3.__key) === r3) {
    t2 = r3.loc.source.body;
  } else {
    t2 = d2.get(r3) || sanitizeDocument(print(r3));
    d2.set(r3, t2);
  }
  if ("string" != typeof r3 && !r3.loc) {
    r3.loc = {
      start: 0,
      end: t2.length,
      source: {
        body: t2,
        name: "gql",
        locationOffset: {
          line: 1,
          column: 1
        }
      }
    };
  }
  return t2;
};
var hashDocument = (r3) => {
  var e3 = phash(stringifyDocument(r3));
  if (r3.definitions) {
    var t2 = getOperationName(r3);
    if (t2) {
      e3 = phash(`
# ${t2}`, e3);
    }
  }
  return e3;
};
var keyDocument = (r3) => {
  var e3;
  var a2;
  if ("string" == typeof r3) {
    e3 = hashDocument(r3);
    a2 = u2.get(e3) || parse(r3, {
      noLocation: true
    });
  } else {
    e3 = r3.__key || hashDocument(r3);
    a2 = u2.get(e3) || r3;
  }
  if (!a2.loc) {
    stringifyDocument(a2);
  }
  a2.__key = e3;
  u2.set(e3, a2);
  return a2;
};
var createRequest = (r3, e3, t2) => {
  var a2 = e3 || {};
  var o2 = keyDocument(r3);
  var n2 = stringifyVariables(a2);
  var s2 = o2.__key;
  if ("{}" !== n2) {
    s2 = phash(n2, s2);
  }
  return {
    key: s2,
    query: o2,
    variables: a2,
    extensions: t2
  };
};
var getOperationName = (r3) => {
  for (var e3 of r3.definitions) {
    if (e3.kind === e.OPERATION_DEFINITION) {
      return e3.name ? e3.name.value : void 0;
    }
  }
};
var getOperationType = (r3) => {
  for (var e3 of r3.definitions) {
    if (e3.kind === e.OPERATION_DEFINITION) {
      return e3.operation;
    }
  }
};
var makeResult = (r3, e3, t2) => {
  if (!("data" in e3 || "errors" in e3 && Array.isArray(e3.errors))) {
    throw new Error("No Content");
  }
  var a2 = "subscription" === r3.kind;
  return {
    operation: r3,
    data: e3.data,
    error: Array.isArray(e3.errors) ? new CombinedError({
      graphQLErrors: e3.errors,
      response: t2
    }) : void 0,
    extensions: e3.extensions ? {
      ...e3.extensions
    } : void 0,
    hasNext: null == e3.hasNext ? a2 : e3.hasNext,
    stale: false
  };
};
var deepMerge = (r3, e3) => {
  if ("object" == typeof r3 && null != r3) {
    if (!r3.constructor || r3.constructor === Object || Array.isArray(r3)) {
      r3 = Array.isArray(r3) ? [...r3] : {
        ...r3
      };
      for (var t2 of Object.keys(e3)) {
        r3[t2] = deepMerge(r3[t2], e3[t2]);
      }
      return r3;
    }
  }
  return e3;
};
var mergeResultPatch = (r3, e3, t2, a2) => {
  var o2 = r3.error ? r3.error.graphQLErrors : [];
  var n2 = !!r3.extensions || !!e3.extensions;
  var s2 = {
    ...r3.extensions,
    ...e3.extensions
  };
  var i3 = e3.incremental;
  if ("path" in e3) {
    i3 = [e3];
  }
  var f4 = {
    data: r3.data
  };
  if (i3) {
    var _loop = function(r4) {
      if (Array.isArray(r4.errors)) {
        o2.push(...r4.errors);
      }
      if (r4.extensions) {
        Object.assign(s2, r4.extensions);
        n2 = true;
      }
      var e4 = "data";
      var t3 = f4;
      var i4 = [];
      if (r4.path) {
        i4 = r4.path;
      } else if (a2) {
        var v5 = a2.find((e5) => e5.id === r4.id);
        if (r4.subPath) {
          i4 = [...v5.path, ...r4.subPath];
        } else {
          i4 = v5.path;
        }
      }
      for (var l4 = 0, c4 = i4.length; l4 < c4; e4 = i4[l4++]) {
        t3 = t3[e4] = Array.isArray(t3[e4]) ? [...t3[e4]] : {
          ...t3[e4]
        };
      }
      if (r4.items) {
        var p4 = +e4 >= 0 ? e4 : 0;
        for (var d4 = 0, u3 = r4.items.length; d4 < u3; d4++) {
          t3[p4 + d4] = deepMerge(t3[p4 + d4], r4.items[d4]);
        }
      } else if (void 0 !== r4.data) {
        t3[e4] = deepMerge(t3[e4], r4.data);
      }
    };
    for (var v4 of i3) {
      _loop(v4);
    }
  } else {
    f4.data = e3.data || r3.data;
    o2 = e3.errors || o2;
  }
  return {
    operation: r3.operation,
    data: f4.data,
    error: o2.length ? new CombinedError({
      graphQLErrors: o2,
      response: t2
    }) : void 0,
    extensions: n2 ? s2 : void 0,
    hasNext: null != e3.hasNext ? e3.hasNext : r3.hasNext,
    stale: false
  };
};
var makeErrorResult = (r3, e3, t2) => ({
  operation: r3,
  data: void 0,
  error: new CombinedError({
    networkError: e3,
    response: t2
  }),
  extensions: void 0,
  hasNext: false,
  stale: false
});
function makeFetchBody(r3) {
  return {
    query: r3.extensions && r3.extensions.persistedQuery && !r3.extensions.persistedQuery.miss ? void 0 : stringifyDocument(r3.query),
    operationName: getOperationName(r3.query),
    variables: r3.variables || void 0,
    extensions: r3.extensions
  };
}
var makeFetchURL = (r3, e3) => {
  var t2 = "query" === r3.kind && r3.context.preferGetMethod;
  if (!t2 || !e3) {
    return r3.context.url;
  }
  var a2 = new URL(r3.context.url);
  for (var o2 in e3) {
    var n2 = e3[o2];
    if (n2) {
      a2.searchParams.set(o2, "object" == typeof n2 ? stringifyVariables(n2) : n2);
    }
  }
  var s2 = a2.toString();
  if (s2.length > 2047 && "force" !== t2) {
    r3.context.preferGetMethod = false;
    return r3.context.url;
  }
  return s2;
};
var serializeBody = (r3, e3) => {
  if (e3 && !("query" === r3.kind && !!r3.context.preferGetMethod)) {
    var t2 = stringifyVariables(e3);
    var a2 = ((r4) => {
      var e4 = /* @__PURE__ */ new Map();
      if (v2 !== NoopConstructor || l2 !== NoopConstructor) {
        i2.clear();
        extract(e4, "variables", r4);
      }
      return e4;
    })(e3.variables);
    if (a2.size) {
      var o2 = new FormData();
      o2.append("operations", t2);
      o2.append("map", stringifyVariables({
        ...[...a2.keys()].map((r4) => [r4])
      }));
      var n2 = 0;
      for (var s2 of a2.values()) {
        o2.append("" + n2++, s2);
      }
      return o2;
    }
    return t2;
  }
};
var makeFetchOptions = (r3, e3) => {
  var t2 = {
    accept: "subscription" === r3.kind ? "text/event-stream, multipart/mixed" : "application/graphql-response+json, application/graphql+json, application/json, text/event-stream, multipart/mixed"
  };
  var a2 = ("function" == typeof r3.context.fetchOptions ? r3.context.fetchOptions() : r3.context.fetchOptions) || {};
  if (a2.headers) {
    for (var o2 in a2.headers) {
      t2[o2.toLowerCase()] = a2.headers[o2];
    }
  }
  var n2 = serializeBody(r3, e3);
  if ("string" == typeof n2 && !t2["content-type"]) {
    t2["content-type"] = "application/json";
  }
  return {
    ...a2,
    method: n2 ? "POST" : "GET",
    body: n2,
    headers: t2
  };
};
var y2 = "undefined" != typeof TextDecoder ? new TextDecoder() : null;
var h = /boundary="?([^=";]+)"?/i;
var x = /data: ?([^\n]+)/;
var toString = (r3) => "Buffer" === r3.constructor.name ? r3.toString() : y2.decode(r3);
async function* streamBody(r3) {
  if (r3.body[Symbol.asyncIterator]) {
    for await (var e3 of r3.body) {
      yield toString(e3);
    }
  } else {
    var t2 = r3.body.getReader();
    var a2;
    try {
      while (!(a2 = await t2.read()).done) {
        yield toString(a2.value);
      }
    } finally {
      t2.cancel();
    }
  }
}
async function* split(r3, e3) {
  var t2 = "";
  var a2;
  for await (var o2 of r3) {
    t2 += o2;
    while ((a2 = t2.indexOf(e3)) > -1) {
      yield t2.slice(0, a2);
      t2 = t2.slice(a2 + e3.length);
    }
  }
}
async function* fetchOperation(r3, e3, t2) {
  var a2 = true;
  var o2 = null;
  var n2;
  try {
    yield await Promise.resolve();
    var s2 = (n2 = await (r3.context.fetch || fetch)(e3, t2)).headers.get("Content-Type") || "";
    var i3;
    if (/multipart\/mixed/i.test(s2)) {
      i3 = async function* parseMultipartMixed(r4, e4) {
        var t3 = r4.match(h);
        var a3 = "--" + (t3 ? t3[1] : "-");
        var o3 = true;
        var n3;
        for await (var s3 of split(streamBody(e4), "\r\n" + a3)) {
          if (o3) {
            o3 = false;
            var i4 = s3.indexOf(a3);
            if (i4 > -1) {
              s3 = s3.slice(i4 + a3.length);
            } else {
              continue;
            }
          }
          try {
            yield n3 = JSON.parse(s3.slice(s3.indexOf("\r\n\r\n") + 4));
          } catch (r5) {
            if (!n3) {
              throw r5;
            }
          }
          if (n3 && false === n3.hasNext) {
            break;
          }
        }
        if (n3 && false !== n3.hasNext) {
          yield {
            hasNext: false
          };
        }
      }(s2, n2);
    } else if (/text\/event-stream/i.test(s2)) {
      i3 = async function* parseEventStream(r4) {
        var e4;
        for await (var t3 of split(streamBody(r4), "\n\n")) {
          var a3 = t3.match(x);
          if (a3) {
            var o3 = a3[1];
            try {
              yield e4 = JSON.parse(o3);
            } catch (r5) {
              if (!e4) {
                throw r5;
              }
            }
            if (e4 && false === e4.hasNext) {
              break;
            }
          }
        }
        if (e4 && false !== e4.hasNext) {
          yield {
            hasNext: false
          };
        }
      }(n2);
    } else if (!/text\//i.test(s2)) {
      i3 = async function* parseJSON(r4) {
        yield JSON.parse(await r4.text());
      }(n2);
    } else {
      i3 = async function* parseMaybeJSON(r4) {
        var e4 = await r4.text();
        try {
          var t3 = JSON.parse(e4);
          if (true) {
            console.warn('Found response with content-type "text/plain" but it had a valid "application/json" response.');
          }
          yield t3;
        } catch (r5) {
          throw new Error(e4);
        }
      }(n2);
    }
    var f4;
    for await (var v4 of i3) {
      if (v4.pending && !o2) {
        f4 = v4.pending;
      } else if (v4.pending) {
        f4 = [...f4, ...v4.pending];
      }
      o2 = o2 ? mergeResultPatch(o2, v4, n2, f4) : makeResult(r3, v4, n2);
      a2 = false;
      yield o2;
      a2 = true;
    }
    if (!o2) {
      yield o2 = makeResult(r3, {}, n2);
    }
  } catch (e4) {
    if (!a2) {
      throw e4;
    }
    yield makeErrorResult(r3, n2 && (n2.status < 200 || n2.status >= 300) && n2.statusText ? new Error(n2.statusText) : e4, n2);
  }
}
function makeFetchSource(r3, e3, t2) {
  var a2;
  if ("undefined" != typeof AbortController) {
    t2.signal = (a2 = new AbortController()).signal;
  }
  return onEnd(() => {
    if (a2) {
      a2.abort();
    }
  })(filter((r4) => !!r4)(fromAsyncIterable(fetchOperation(r3, e3, t2))));
}

// node_modules/@urql/core/dist/urql-core.mjs
var collectTypes = (e3, r3) => {
  if (Array.isArray(e3)) {
    for (var t2 of e3) {
      collectTypes(t2, r3);
    }
  } else if ("object" == typeof e3 && null !== e3) {
    for (var n2 in e3) {
      if ("__typename" === n2 && "string" == typeof e3[n2]) {
        r3.add(e3[n2]);
      } else {
        collectTypes(e3[n2], r3);
      }
    }
  }
  return r3;
};
var formatNode = (r3) => {
  if ("definitions" in r3) {
    var t2 = [];
    for (var n2 of r3.definitions) {
      var a2 = formatNode(n2);
      t2.push(a2);
    }
    return {
      ...r3,
      definitions: t2
    };
  }
  if ("directives" in r3 && r3.directives && r3.directives.length) {
    var o2 = [];
    var i3 = {};
    for (var s2 of r3.directives) {
      var c4 = s2.name.value;
      if ("_" !== c4[0]) {
        o2.push(s2);
      } else {
        c4 = c4.slice(1);
      }
      i3[c4] = s2;
    }
    r3 = {
      ...r3,
      directives: o2,
      _directives: i3
    };
  }
  if ("selectionSet" in r3) {
    var u3 = [];
    var p4 = r3.kind === e.OPERATION_DEFINITION;
    if (r3.selectionSet) {
      for (var d4 of r3.selectionSet.selections || []) {
        p4 = p4 || d4.kind === e.FIELD && "__typename" === d4.name.value && !d4.alias;
        var v4 = formatNode(d4);
        u3.push(v4);
      }
      if (!p4) {
        u3.push({
          kind: e.FIELD,
          name: {
            kind: e.NAME,
            value: "__typename"
          },
          _generated: true
        });
      }
      return {
        ...r3,
        selectionSet: {
          ...r3.selectionSet,
          selections: u3
        }
      };
    }
  }
  return r3;
};
var I = /* @__PURE__ */ new Map();
var formatDocument = (e3) => {
  var t2 = keyDocument(e3);
  var n2 = I.get(t2.__key);
  if (!n2) {
    I.set(t2.__key, n2 = formatNode(t2));
    Object.defineProperty(n2, "__key", {
      value: t2.__key,
      enumerable: false
    });
  }
  return n2;
};
var maskTypename = (e3, r3) => {
  if (!e3 || "object" != typeof e3) {
    return e3;
  } else if (Array.isArray(e3)) {
    return e3.map((e4) => maskTypename(e4));
  } else if (e3 && "object" == typeof e3 && (r3 || "__typename" in e3)) {
    var t2 = {};
    for (var n2 in e3) {
      if ("__typename" === n2) {
        Object.defineProperty(t2, "__typename", {
          enumerable: false,
          value: e3.__typename
        });
      } else {
        t2[n2] = maskTypename(e3[n2]);
      }
    }
    return t2;
  } else {
    return e3;
  }
};
function withPromise(e3) {
  var source$ = (r3) => e3(r3);
  source$.toPromise = () => toPromise(take(1)(filter((e4) => !e4.stale && !e4.hasNext)(source$)));
  source$.then = (e4, r3) => source$.toPromise().then(e4, r3);
  source$.subscribe = (e4) => subscribe(e4)(source$);
  return source$;
}
function makeOperation(e3, r3, t2) {
  return {
    ...r3,
    kind: e3,
    context: r3.context ? {
      ...r3.context,
      ...t2
    } : t2 || r3.context
  };
}
var addMetadata = (e3, r3) => makeOperation(e3.kind, e3, {
  meta: {
    ...e3.context.meta,
    ...r3
  }
});
var noop = () => {
};
function gql(n2) {
  var a2 = /* @__PURE__ */ new Map();
  var o2 = [];
  var i3 = [];
  var s2 = Array.isArray(n2) ? n2[0] : n2 || "";
  for (var c4 = 1; c4 < arguments.length; c4++) {
    var u3 = arguments[c4];
    if (u3 && u3.definitions) {
      i3.push(u3);
    } else {
      s2 += u3;
    }
    s2 += arguments[0][c4];
  }
  i3.unshift(keyDocument(s2));
  for (var p4 of i3) {
    for (var d4 of p4.definitions) {
      if (d4.kind === e.FRAGMENT_DEFINITION) {
        var v4 = d4.name.value;
        var f4 = stringifyDocument(d4);
        if (!a2.has(v4)) {
          a2.set(v4, f4);
          o2.push(d4);
        } else if (a2.get(v4) !== f4) {
          console.warn("[WARNING: Duplicate Fragment] A fragment with name `" + v4 + "` already exists in this document.\nWhile fragment names may not be unique across your source, each name must be unique per document.");
        }
      } else {
        o2.push(d4);
      }
    }
  }
  return keyDocument({
    kind: e.DOCUMENT,
    definitions: o2
  });
}
var shouldSkip = ({ kind: e3 }) => "mutation" !== e3 && "query" !== e3;
var mapTypeNames = (e3) => {
  var r3 = formatDocument(e3.query);
  if (r3 !== e3.query) {
    var t2 = makeOperation(e3.kind, e3);
    t2.query = r3;
    return t2;
  } else {
    return e3;
  }
};
var cacheExchange = ({ forward: e3, client: r3, dispatchDebug: t2 }) => {
  var a2 = /* @__PURE__ */ new Map();
  var o2 = /* @__PURE__ */ new Map();
  var isOperationCached = (e4) => "query" === e4.kind && "network-only" !== e4.context.requestPolicy && ("cache-only" === e4.context.requestPolicy || a2.has(e4.key));
  return (i3) => {
    var s2 = map((e4) => {
      var o3 = a2.get(e4.key);
      t2({
        operation: e4,
        ...o3 ? {
          type: "cacheHit",
          message: "The result was successfully retried from the cache"
        } : {
          type: "cacheMiss",
          message: "The result could not be retrieved from the cache"
        },
        source: "cacheExchange"
      });
      var i4 = o3 || makeResult(e4, {
        data: null
      });
      if (true) {
        i4 = {
          ...i4,
          operation: true ? addMetadata(e4, {
            cacheOutcome: o3 ? "hit" : "miss"
          }) : e4
        };
      }
      if ("cache-and-network" === e4.context.requestPolicy) {
        i4.stale = true;
        reexecuteOperation(r3, e4);
      }
      return i4;
    })(filter((e4) => !shouldSkip(e4) && isOperationCached(e4))(i3));
    var c4 = onPush((e4) => {
      var { operation: n2 } = e4;
      if (!n2) {
        return;
      }
      var i4 = n2.context.additionalTypenames || [];
      if ("subscription" !== e4.operation.kind) {
        i4 = ((e5) => [...collectTypes(e5, /* @__PURE__ */ new Set())])(e4.data).concat(i4);
      }
      if ("mutation" === e4.operation.kind || "subscription" === e4.operation.kind) {
        var s3 = /* @__PURE__ */ new Set();
        t2({
          type: "cacheInvalidation",
          message: `The following typenames have been invalidated: ${i4}`,
          operation: n2,
          data: {
            typenames: i4,
            response: e4
          },
          source: "cacheExchange"
        });
        for (var c5 = 0; c5 < i4.length; c5++) {
          var u3 = i4[c5];
          var p4 = o2.get(u3);
          if (!p4) {
            o2.set(u3, p4 = /* @__PURE__ */ new Set());
          }
          for (var d4 of p4.values()) {
            s3.add(d4);
          }
          p4.clear();
        }
        for (var v4 of s3.values()) {
          if (a2.has(v4)) {
            n2 = a2.get(v4).operation;
            a2.delete(v4);
            reexecuteOperation(r3, n2);
          }
        }
      } else if ("query" === n2.kind && e4.data) {
        a2.set(n2.key, e4);
        for (var f4 = 0; f4 < i4.length; f4++) {
          var l4 = i4[f4];
          var h2 = o2.get(l4);
          if (!h2) {
            o2.set(l4, h2 = /* @__PURE__ */ new Set());
          }
          h2.add(n2.key);
        }
      }
    })(e3(filter((e4) => "query" !== e4.kind || "cache-only" !== e4.context.requestPolicy)(map((e4) => true ? addMetadata(e4, {
      cacheOutcome: "miss"
    }) : e4)(merge([map(mapTypeNames)(filter((e4) => !shouldSkip(e4) && !isOperationCached(e4))(i3)), filter((e4) => shouldSkip(e4))(i3)])))));
    return merge([s2, c4]);
  };
};
var reexecuteOperation = (e3, r3) => e3.reexecuteOperation(makeOperation(r3.kind, r3, {
  requestPolicy: "network-only"
}));
var T = /* @__PURE__ */ new Set();
var ssrExchange = (e3 = {}) => {
  var r3 = !!e3.staleWhileRevalidate;
  var t2 = !!e3.includeExtensions;
  var n2 = {};
  var o2 = [];
  var invalidate = (e4) => {
    o2.push(e4.operation.key);
    if (1 === o2.length) {
      Promise.resolve().then(() => {
        var e5;
        while (e5 = o2.shift()) {
          n2[e5] = null;
        }
      });
    }
  };
  var ssr = ({ client: o3, forward: i3 }) => (s2) => {
    var c4 = e3 && "boolean" == typeof e3.isClient ? !!e3.isClient : !o3.suspense;
    var u3 = i3(map(mapTypeNames)(filter((e4) => "teardown" === e4.kind || !n2[e4.key] || !!n2[e4.key].hasNext || "network-only" === e4.context.requestPolicy)(s2)));
    var p4 = map((e4) => {
      var i4 = ((e5, r4, t3) => ({
        operation: e5,
        data: r4.data ? JSON.parse(r4.data) : void 0,
        extensions: t3 && r4.extensions ? JSON.parse(r4.extensions) : void 0,
        error: r4.error ? new CombinedError({
          networkError: r4.error.networkError ? new Error(r4.error.networkError) : void 0,
          graphQLErrors: r4.error.graphQLErrors
        }) : void 0,
        stale: false,
        hasNext: !!r4.hasNext
      }))(e4, n2[e4.key], t2);
      if (r3 && !T.has(e4.key)) {
        i4.stale = true;
        T.add(e4.key);
        reexecuteOperation(o3, e4);
      }
      return {
        ...i4,
        operation: true ? addMetadata(e4, {
          cacheOutcome: "hit"
        }) : e4
      };
    })(filter((e4) => "teardown" !== e4.kind && !!n2[e4.key] && "network-only" !== e4.context.requestPolicy)(s2));
    if (!c4) {
      u3 = onPush((e4) => {
        var { operation: r4 } = e4;
        if ("mutation" !== r4.kind) {
          var a2 = ((e5, r5) => {
            var t3 = {
              data: JSON.stringify(e5.data),
              hasNext: e5.hasNext
            };
            if (void 0 !== e5.data) {
              t3.data = JSON.stringify(e5.data);
            }
            if (r5 && void 0 !== e5.extensions) {
              t3.extensions = JSON.stringify(e5.extensions);
            }
            if (e5.error) {
              t3.error = {
                graphQLErrors: e5.error.graphQLErrors.map((e6) => {
                  if (!e6.path && !e6.extensions) {
                    return e6.message;
                  }
                  return {
                    message: e6.message,
                    path: e6.path,
                    extensions: e6.extensions
                  };
                })
              };
              if (e5.error.networkError) {
                t3.error.networkError = "" + e5.error.networkError;
              }
            }
            return t3;
          })(e4, t2);
          n2[r4.key] = a2;
        }
      })(u3);
    } else {
      p4 = onPush(invalidate)(p4);
    }
    return merge([u3, p4]);
  };
  ssr.restoreData = (e4) => {
    for (var r4 in e4) {
      if (null !== n2[r4]) {
        n2[r4] = e4[r4];
      }
    }
  };
  ssr.extractData = () => {
    var e4 = {};
    for (var r4 in n2) {
      if (null != n2[r4]) {
        e4[r4] = n2[r4];
      }
    }
    return e4;
  };
  if (e3 && e3.initialState) {
    ssr.restoreData(e3.initialState);
  }
  return ssr;
};
var subscriptionExchange = ({ forwardSubscription: e3, enableAllOperations: r3, isSubscriptionOperation: t2 }) => ({ client: a2, forward: i3 }) => {
  var u3 = t2 || ((e4) => "subscription" === e4.kind || !!r3 && ("query" === e4.kind || "mutation" === e4.kind));
  return (r4) => {
    var t3 = mergeMap((t4) => {
      var { key: i4 } = t4;
      var u4 = filter((e4) => "teardown" === e4.kind && e4.key === i4)(r4);
      return takeUntil(u4)(((r5) => {
        var t5 = e3(makeFetchBody(r5), r5);
        return make((e4) => {
          var o2 = false;
          var i5;
          var u5;
          function nextResult(t6) {
            e4.next(u5 = u5 ? mergeResultPatch(u5, t6) : makeResult(r5, t6));
          }
          Promise.resolve().then(() => {
            if (o2) {
              return;
            }
            i5 = t5.subscribe({
              next: nextResult,
              error(t6) {
                if (Array.isArray(t6)) {
                  nextResult({
                    errors: t6
                  });
                } else {
                  e4.next(makeErrorResult(r5, t6));
                }
                e4.complete();
              },
              complete() {
                if (!o2) {
                  o2 = true;
                  if ("subscription" === r5.kind) {
                    a2.reexecuteOperation(makeOperation("teardown", r5, r5.context));
                  }
                  if (u5 && u5.hasNext) {
                    nextResult({
                      hasNext: false
                    });
                  }
                  e4.complete();
                }
              }
            });
          });
          return () => {
            o2 = true;
            if (i5) {
              i5.unsubscribe();
            }
          };
        });
      })(t4));
    })(filter((e4) => "teardown" !== e4.kind && u3(e4))(r4));
    var p4 = i3(filter((e4) => "teardown" === e4.kind || !u3(e4))(r4));
    return merge([t3, p4]);
  };
};
var debugExchange = ({ forward: e3 }) => {
  if (false) {
    return (r3) => e3(r3);
  } else {
    return (r3) => onPush((e4) => console.log("[Exchange debug]: Completed operation: ", e4))(e3(onPush((e4) => console.log("[Exchange debug]: Incoming operation: ", e4))(r3)));
  }
};
var dedupExchange = ({ forward: e3 }) => (r3) => e3(r3);
var fetchExchange = ({ forward: e3, dispatchDebug: r3 }) => (t2) => {
  var n2 = mergeMap((e4) => {
    var n3 = makeFetchBody(e4);
    var a3 = makeFetchURL(e4, n3);
    var i3 = makeFetchOptions(e4, n3);
    r3({
      type: "fetchRequest",
      message: "A fetch request is being executed.",
      operation: e4,
      data: {
        url: a3,
        fetchOptions: i3
      },
      source: "fetchExchange"
    });
    var s2 = takeUntil(filter((r4) => "teardown" === r4.kind && r4.key === e4.key)(t2))(makeFetchSource(e4, a3, i3));
    if (true) {
      return onPush((t3) => {
        var n4 = !t3.data ? t3.error : void 0;
        r3({
          type: n4 ? "fetchError" : "fetchSuccess",
          message: `A ${n4 ? "failed" : "successful"} fetch response has been returned.`,
          operation: e4,
          data: {
            url: a3,
            fetchOptions: i3,
            value: n4 || t3
          },
          source: "fetchExchange"
        });
      })(s2);
    }
    return s2;
  })(filter((e4) => "teardown" !== e4.kind && ("subscription" !== e4.kind || !!e4.context.fetchSubscriptions))(t2));
  var a2 = e3(filter((e4) => "teardown" === e4.kind || "subscription" === e4.kind && !e4.context.fetchSubscriptions)(t2));
  return merge([n2, a2]);
};
var composeExchanges = (e3) => ({ client: r3, forward: t2, dispatchDebug: n2 }) => e3.reduceRight((e4, t3) => {
  var a2 = false;
  return t3({
    client: r3,
    forward(r4) {
      if (true) {
        if (a2) {
          throw new Error("forward() must only be called once in each Exchange.");
        }
        a2 = true;
      }
      return share(e4(share(r4)));
    },
    dispatchDebug(e5) {
      n2({
        timestamp: Date.now(),
        source: t3.name,
        ...e5
      });
    }
  });
}, t2);
var mapExchange = ({ onOperation: e3, onResult: r3, onError: t2 }) => ({ forward: n2 }) => (a2) => mergeMap((e4) => {
  if (t2 && e4.error) {
    t2(e4.error, e4.operation);
  }
  var n3 = r3 && r3(e4) || e4;
  return "then" in n3 ? fromPromise(n3) : fromValue(n3);
})(n2(mergeMap((r4) => {
  var t3 = e3 && e3(r4) || r4;
  return "then" in t3 ? fromPromise(t3) : fromValue(t3);
})(a2)));
var fallbackExchange = ({ dispatchDebug: e3 }) => (r3) => {
  if (true) {
    r3 = onPush((r4) => {
      if ("teardown" !== r4.kind && true) {
        var t2 = `No exchange has handled operations of kind "${r4.kind}". Check whether you've added an exchange responsible for these operations.`;
        e3({
          type: "fallbackCatch",
          message: t2,
          operation: r4,
          source: "fallbackExchange"
        });
        console.warn(t2);
      }
    })(r3);
  }
  return filter((e4) => false)(r3);
};
var C = function Client(e3) {
  if (!e3.url) {
    throw new Error("You are creating an urql-client without a url.");
  }
  var r3 = 0;
  var t2 = /* @__PURE__ */ new Map();
  var n2 = /* @__PURE__ */ new Map();
  var a2 = /* @__PURE__ */ new Set();
  var o2 = [];
  var i3 = {
    url: e3.url,
    fetchSubscriptions: e3.fetchSubscriptions,
    fetchOptions: e3.fetchOptions,
    fetch: e3.fetch,
    preferGetMethod: e3.preferGetMethod,
    requestPolicy: e3.requestPolicy || "cache-first"
  };
  var s2 = makeSubject();
  function nextOperation(e4) {
    if ("mutation" === e4.kind || "teardown" === e4.kind || !a2.has(e4.key)) {
      if ("teardown" === e4.kind) {
        a2.delete(e4.key);
      } else if ("mutation" !== e4.kind) {
        a2.add(e4.key);
      }
      s2.next(e4);
    }
  }
  var c4 = false;
  function dispatchOperation(e4) {
    if (e4) {
      nextOperation(e4);
    }
    if (!c4) {
      c4 = true;
      while (c4 && (e4 = o2.shift())) {
        nextOperation(e4);
      }
      c4 = false;
    }
  }
  var makeResultSource = (r4) => {
    var i4 = takeUntil(filter((e4) => "teardown" === e4.kind && e4.key === r4.key)(s2.source))(filter((e4) => e4.operation.kind === r4.kind && e4.operation.key === r4.key && (!e4.operation.context._instance || e4.operation.context._instance === r4.context._instance))(O));
    if (e3.maskTypename) {
      i4 = map((e4) => ({
        ...e4,
        data: maskTypename(e4.data, true)
      }))(i4);
    }
    if ("query" !== r4.kind) {
      i4 = takeWhile((e4) => !!e4.hasNext, true)(i4);
    } else {
      i4 = switchMap((e4) => {
        var t3 = fromValue(e4);
        return e4.stale || e4.hasNext ? t3 : merge([t3, map(() => {
          e4.stale = true;
          return e4;
        })(take(1)(filter((e5) => e5.key === r4.key)(s2.source)))]);
      })(i4);
    }
    if ("mutation" !== r4.kind) {
      i4 = onEnd(() => {
        a2.delete(r4.key);
        t2.delete(r4.key);
        n2.delete(r4.key);
        c4 = false;
        for (var e4 = o2.length - 1; e4 >= 0; e4--) {
          if (o2[e4].key === r4.key) {
            o2.splice(e4, 1);
          }
        }
        nextOperation(makeOperation("teardown", r4, r4.context));
      })(onPush((e4) => {
        if (e4.stale) {
          for (var n3 of o2) {
            if (n3.key === e4.operation.key) {
              a2.delete(n3.key);
              break;
            }
          }
        } else if (!e4.hasNext) {
          a2.delete(r4.key);
        }
        t2.set(r4.key, e4);
      })(i4));
    } else {
      i4 = onStart(() => {
        nextOperation(r4);
      })(i4);
    }
    return share(i4);
  };
  var u3 = this instanceof Client ? this : Object.create(Client.prototype);
  var p4 = Object.assign(u3, {
    suspense: !!e3.suspense,
    operations$: s2.source,
    reexecuteOperation(e4) {
      if ("teardown" === e4.kind) {
        dispatchOperation(e4);
      } else if ("mutation" === e4.kind || n2.has(e4.key)) {
        var r4 = false;
        for (var t3 = 0; t3 < o2.length; t3++) {
          r4 = r4 || o2[t3].key === e4.key;
        }
        if (!r4) {
          a2.delete(e4.key);
        }
        o2.push(e4);
        Promise.resolve().then(dispatchOperation);
      }
    },
    createRequestOperation(e4, t3, n3) {
      if (!n3) {
        n3 = {};
      }
      var a3;
      if ("teardown" !== e4 && (a3 = getOperationType(t3.query)) !== e4) {
        throw new Error(`Expected operation of type "${e4}" but found "${a3}"`);
      }
      return makeOperation(e4, t3, {
        _instance: "mutation" === e4 ? r3 = r3 + 1 | 0 : void 0,
        ...i3,
        ...n3,
        requestPolicy: n3.requestPolicy || i3.requestPolicy,
        suspense: n3.suspense || false !== n3.suspense && p4.suspense
      });
    },
    executeRequestOperation(e4) {
      if ("mutation" === e4.kind) {
        return withPromise(makeResultSource(e4));
      }
      return withPromise(lazy(() => {
        var r4 = n2.get(e4.key);
        if (!r4) {
          n2.set(e4.key, r4 = makeResultSource(e4));
        }
        r4 = onStart(() => {
          dispatchOperation(e4);
        })(r4);
        var a3 = t2.get(e4.key);
        if ("query" === e4.kind && a3 && (a3.stale || a3.hasNext)) {
          return switchMap(fromValue)(merge([r4, filter((r5) => r5 === t2.get(e4.key))(fromValue(a3))]));
        } else {
          return r4;
        }
      }));
    },
    executeQuery(e4, r4) {
      var t3 = p4.createRequestOperation("query", e4, r4);
      return p4.executeRequestOperation(t3);
    },
    executeSubscription(e4, r4) {
      var t3 = p4.createRequestOperation("subscription", e4, r4);
      return p4.executeRequestOperation(t3);
    },
    executeMutation(e4, r4) {
      var t3 = p4.createRequestOperation("mutation", e4, r4);
      return p4.executeRequestOperation(t3);
    },
    readQuery(e4, r4, t3) {
      var n3 = null;
      subscribe((e5) => {
        n3 = e5;
      })(p4.query(e4, r4, t3)).unsubscribe();
      return n3;
    },
    query: (e4, r4, t3) => p4.executeQuery(createRequest(e4, r4), t3),
    subscription: (e4, r4, t3) => p4.executeSubscription(createRequest(e4, r4), t3),
    mutation: (e4, r4, t3) => p4.executeMutation(createRequest(e4, r4), t3)
  });
  var d4 = noop;
  if (true) {
    var { next: l4, source: x2 } = makeSubject();
    p4.subscribeToDebugTarget = (e4) => subscribe(e4)(x2);
    d4 = l4;
  }
  var g2 = composeExchanges(e3.exchanges);
  var O = share(g2({
    client: p4,
    dispatchDebug: d4,
    forward: fallbackExchange({
      dispatchDebug: d4
    })
  })(s2.source));
  publish(O);
  return p4;
};
var j = C;

// node_modules/urql/dist/urql.es.js
var r2 = __toESM(require_react());
var c3 = {};
var v3 = r2.createContext(c3);
var f3 = v3.Provider;
var l3 = v3.Consumer;
v3.displayName = "UrqlContext";
var useClient = () => {
  var e3 = r2.useContext(v3);
  if (e3 === c3 && true) {
    var t2 = "No client has been specified using urql's Provider. please create a client and add a Provider.";
    console.error(t2);
    throw new Error(t2);
  }
  return e3;
};
var d3 = {
  fetching: false,
  stale: false,
  error: void 0,
  data: void 0,
  extensions: void 0,
  operation: void 0
};
var areOperationsEqual = (e3, r3) => e3 === r3 || !(!e3 || !r3 || e3.key !== r3.key);
var computeNextState = (e3, r3) => {
  var t2 = {
    ...e3,
    ...r3,
    data: void 0 !== r3.data || r3.error ? r3.data : e3.data,
    fetching: !!r3.fetching,
    stale: !!r3.stale
  };
  return ((e4, r4) => {
    for (var t3 in e4) {
      if (!(t3 in r4)) {
        return true;
      }
    }
    for (var a2 in r4) {
      if ("operation" === a2 ? !areOperationsEqual(e4[a2], r4[a2]) : e4[a2] !== r4[a2]) {
        return true;
      }
    }
    return false;
  })(e3, t2) ? t2 : e3;
};
var hasDepsChanged = (e3, r3) => {
  for (var t2 = 0, a2 = r3.length; t2 < a2; t2++) {
    if (e3[t2] !== r3[t2]) {
      return true;
    }
  }
  return false;
};
var p3 = r2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
function deferDispatch(e3, r3) {
  if (p3 && p3.ReactCurrentOwner && p3.ReactCurrentOwner.current) {
    Promise.resolve(r3).then(e3);
  } else {
    e3(r3);
  }
}
function useMutation(i3) {
  var s2 = r2.useRef(true);
  var o2 = useClient();
  var [c4, v4] = r2.useState(d3);
  var f4 = r2.useCallback((r3, c5) => {
    deferDispatch(v4, {
      ...d3,
      fetching: true
    });
    return toPromise(take(1)(filter((e3) => !e3.hasNext)(onPush((e3) => {
      if (s2.current) {
        deferDispatch(v4, {
          fetching: false,
          stale: e3.stale,
          data: e3.data,
          error: e3.error,
          extensions: e3.extensions,
          operation: e3.operation
        });
      }
    })(o2.executeMutation(createRequest(i3, r3), c5 || {})))));
  }, [o2, i3, v4]);
  r2.useEffect(() => {
    s2.current = true;
    return () => {
      s2.current = false;
    };
  }, []);
  return [c4, f4];
}
function useRequest(t2, a2) {
  var n2 = r2.useRef(void 0);
  return r2.useMemo(() => {
    var r3 = createRequest(t2, a2);
    if (void 0 !== n2.current && n2.current.key === r3.key) {
      return n2.current;
    } else {
      n2.current = r3;
      return r3;
    }
  }, [t2, a2]);
}
var getCacheForClient = (e3) => {
  if (!e3._react) {
    var r3 = /* @__PURE__ */ new Set();
    var t2 = /* @__PURE__ */ new Map();
    if (e3.operations$) {
      subscribe((e4) => {
        if ("teardown" === e4.kind && r3.has(e4.key)) {
          r3.delete(e4.key);
          t2.delete(e4.key);
        }
      })(e3.operations$);
    }
    e3._react = {
      get: (e4) => t2.get(e4),
      set(e4, a2) {
        r3.delete(e4);
        t2.set(e4, a2);
      },
      dispose(e4) {
        r3.add(e4);
      }
    };
  }
  return e3._react;
};
var isSuspense = (e3, r3) => r3 && void 0 !== r3.suspense ? !!r3.suspense : e3.suspense;
function useQuery(e3) {
  var t2 = useClient();
  var a2 = getCacheForClient(t2);
  var n2 = isSuspense(t2, e3.context);
  var c4 = useRequest(e3.query, e3.variables);
  var v4 = r2.useMemo(() => {
    if (e3.pause) {
      return null;
    }
    var r3 = t2.executeQuery(c4, {
      requestPolicy: e3.requestPolicy,
      ...e3.context
    });
    return n2 ? onPush((e4) => {
      a2.set(c4.key, e4);
    })(r3) : r3;
  }, [a2, t2, c4, n2, e3.pause, e3.requestPolicy, e3.context]);
  var f4 = r2.useCallback((e4, r3) => {
    if (!e4) {
      return {
        fetching: false
      };
    }
    var t3 = a2.get(c4.key);
    if (!t3) {
      var n3;
      var u3 = subscribe((e5) => {
        t3 = e5;
        if (n3) {
          n3(t3);
        }
      })(takeWhile(() => r3 && !n3 || !t3)(e4));
      if (null == t3 && r3) {
        var o2 = new Promise((e5) => {
          n3 = e5;
        });
        a2.set(c4.key, o2);
        throw o2;
      } else {
        u3.unsubscribe();
      }
    } else if (r3 && null != t3 && "then" in t3) {
      throw t3;
    }
    return t3 || {
      fetching: true
    };
  }, [a2, c4]);
  var l4 = [t2, c4, e3.requestPolicy, e3.context, e3.pause];
  var [p4, h2] = r2.useState(() => [v4, computeNextState(d3, f4(v4, n2)), l4]);
  var y3 = p4[1];
  if (v4 !== p4[0] && hasDepsChanged(p4[2], l4)) {
    h2([v4, y3 = computeNextState(p4[1], f4(v4, n2)), l4]);
  }
  r2.useEffect(() => {
    var e4 = p4[0];
    var r3 = p4[2][1];
    var t3 = false;
    var updateResult = (e5) => {
      t3 = true;
      deferDispatch(h2, (r4) => {
        var t4 = computeNextState(r4[1], e5);
        return r4[1] !== t4 ? [r4[0], t4, r4[2]] : r4;
      });
    };
    if (e4) {
      var n3 = subscribe(updateResult)(onEnd(() => {
        updateResult({
          fetching: false
        });
      })(e4));
      if (!t3) {
        updateResult({
          fetching: true
        });
      }
      return () => {
        a2.dispose(r3.key);
        n3.unsubscribe();
      };
    } else {
      updateResult({
        fetching: false
      });
    }
  }, [a2, p4[0], p4[2][1]]);
  var x2 = r2.useCallback((r3) => {
    var i3 = {
      requestPolicy: e3.requestPolicy,
      ...e3.context,
      ...r3
    };
    deferDispatch(h2, (e4) => [n2 ? onPush((e5) => {
      a2.set(c4.key, e5);
    })(t2.executeQuery(c4, i3)) : t2.executeQuery(c4, i3), e4[1], l4]);
  }, [t2, a2, c4, n2, e3.requestPolicy, e3.context, e3.pause]);
  return [y3, x2];
}
function useSubscription(e3, t2) {
  var a2 = useClient();
  var n2 = useRequest(e3.query, e3.variables);
  var u3 = r2.useRef(t2);
  u3.current = t2;
  var s2 = r2.useMemo(() => !e3.pause ? a2.executeSubscription(n2, e3.context) : null, [a2, n2, e3.pause, e3.context]);
  var c4 = [a2, n2, e3.context, e3.pause];
  var [v4, f4] = r2.useState(() => [s2, {
    ...d3,
    fetching: !!s2
  }, c4]);
  var l4 = v4[1];
  if (s2 !== v4[0] && hasDepsChanged(v4[2], c4)) {
    f4([s2, l4 = computeNextState(v4[1], {
      fetching: !!s2
    }), c4]);
  }
  r2.useEffect(() => {
    var updateResult = (e4) => {
      deferDispatch(f4, (r3) => {
        var t3 = computeNextState(r3[1], e4);
        if (r3[1] === t3) {
          return r3;
        }
        if (u3.current && r3[1].data !== t3.data) {
          t3.data = u3.current(r3[1].data, t3.data);
        }
        return [r3[0], t3, r3[2]];
      });
    };
    if (v4[0]) {
      return subscribe(updateResult)(onEnd(() => {
        updateResult({
          fetching: !!s2
        });
      })(v4[0])).unsubscribe;
    } else {
      updateResult({
        fetching: false
      });
    }
  }, [v4[0]]);
  var p4 = r2.useCallback((r3) => {
    var t3 = a2.executeSubscription(n2, {
      ...e3.context,
      ...r3
    });
    deferDispatch(f4, (e4) => [t3, e4[1], c4]);
  }, [a2, n2, e3.context, e3.pause]);
  return [l4, p4];
}
function Mutation(e3) {
  var r3 = useMutation(e3.query);
  return e3.children({
    ...r3[0],
    executeMutation: r3[1]
  });
}
function Query(e3) {
  var r3 = useQuery(e3);
  return e3.children({
    ...r3[0],
    executeQuery: r3[1]
  });
}
function Subscription(e3) {
  var r3 = useSubscription(e3, e3.handler);
  return e3.children({
    ...r3[0],
    executeSubscription: r3[1]
  });
}
export {
  C as Client,
  CombinedError,
  l3 as Consumer,
  v3 as Context,
  Mutation,
  f3 as Provider,
  Query,
  Subscription,
  cacheExchange,
  composeExchanges,
  j as createClient,
  createRequest,
  debugExchange,
  dedupExchange,
  mapExchange as errorExchange,
  fetchExchange,
  formatDocument,
  gql,
  makeErrorResult,
  makeOperation,
  makeResult,
  mapExchange,
  maskTypename,
  mergeResultPatch,
  ssrExchange,
  stringifyDocument,
  stringifyVariables,
  subscriptionExchange,
  useClient,
  useMutation,
  useQuery,
  useSubscription
};
//# sourceMappingURL=urql.js.map
