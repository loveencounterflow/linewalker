
'use strict'


# #-----------------------------------------------------------------------------------------------------------
# H.types.declare 'guy_str_walk_lines_cfg', tests:
#   "@isa.object x":          ( x ) -> @isa.object x
#   "@isa.boolean x.trim":    ( x ) -> @isa.boolean x.trim
#   "@isa.text x.prepend":    ( x ) -> @isa.text x.prepend
#   "@isa.text x.append":     ( x ) -> @isa.text x.append

#-----------------------------------------------------------------------------------------------------------
defaults =
  guy_str_walk_lines_cfg:
    trim:           true
    prepend:        ''
    append:         ''


#-----------------------------------------------------------------------------------------------------------
@walk_lines = ( text, cfg ) ->
  for { line, } from @walk_lines_with_positions text, cfg
    yield line
  return null

#-----------------------------------------------------------------------------------------------------------
@walk_lines_with_positions = ( text, cfg ) ->
  H.types.validate.guy_str_walk_lines_cfg ( cfg = { defaults.guy_str_walk_lines_cfg..., cfg..., } )
  { trim
    prepend
    append  }  = cfg
  #.........................................................................................................
  if text is ''
    yield { lnr: 1, line: '', eol: '', }
    return null
  #.........................................................................................................
  lnr           = 0
  pattern       = /(.*?)(\r\n|\r|\n|$)/suy
  last_position = text.length - 1
  #.........................................................................................................
  loop
    idx = pattern.lastIndex
    break if pattern.lastIndex > last_position
    break unless ( match = text.match pattern )?
    [ linenl, line, eol, ] = match
    lnr++
    line  = match[ 1 ]
    line  = line.trimEnd() if trim
    line  = prepend + line  unless prepend  is ''
    line  = line  + append  unless append   is ''
    yield { lnr, line, eol, }
  #.........................................................................................................
  if ( text.match /(\r|\n)$/ )?
    lnr++
    yield { lnr, line: '', eol: '', }
  #.........................................................................................................
  return null








