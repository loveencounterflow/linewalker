(function() {
  'use strict';
  var defaults;

  // #-----------------------------------------------------------------------------------------------------------
  // H.types.declare 'guy_str_walk_lines_cfg', tests:
  //   "@isa.object x":          ( x ) -> @isa.object x
  //   "@isa.boolean x.trim":    ( x ) -> @isa.boolean x.trim
  //   "@isa.text x.prepend":    ( x ) -> @isa.text x.prepend
  //   "@isa.text x.append":     ( x ) -> @isa.text x.append

  //-----------------------------------------------------------------------------------------------------------
  defaults = {
    guy_str_walk_lines_cfg: {
      trim: true,
      prepend: '',
      append: ''
    }
  };

  //-----------------------------------------------------------------------------------------------------------
  this.walk_lines = function*(text, cfg) {
    var line, ref, x;
    ref = this.walk_lines_with_positions(text, cfg);
    for (x of ref) {
      ({line} = x);
      yield line;
    }
    return null;
  };

  //-----------------------------------------------------------------------------------------------------------
  this.walk_lines_with_positions = function*(text, cfg) {
    var append, eol, idx, last_position, line, linenl, lnr, match, pattern, prepend, trim;
    H.types.validate.guy_str_walk_lines_cfg((cfg = {...defaults.guy_str_walk_lines_cfg, ...cfg}));
    ({trim, prepend, append} = cfg);
    //.........................................................................................................
    if (text === '') {
      yield ({
        lnr: 1,
        line: '',
        eol: ''
      });
      return null;
    }
    //.........................................................................................................
    lnr = 0;
    pattern = /(.*?)(\r\n|\r|\n|$)/suy;
    last_position = text.length - 1;
    while (true) {
      //.........................................................................................................
      idx = pattern.lastIndex;
      if (pattern.lastIndex > last_position) {
        break;
      }
      if ((match = text.match(pattern)) == null) {
        break;
      }
      [linenl, line, eol] = match;
      lnr++;
      line = match[1];
      if (trim) {
        line = line.trimEnd();
      }
      if (prepend !== '') {
        line = prepend + line;
      }
      if (append !== '') {
        line = line + append;
      }
      yield ({lnr, line, eol});
    }
    //.........................................................................................................
    if ((text.match(/(\r|\n)$/)) != null) {
      lnr++;
      yield ({
        lnr,
        line: '',
        eol: ''
      });
    }
    //.........................................................................................................
    return null;
  };

}).call(this);

//# sourceMappingURL=main.js.map