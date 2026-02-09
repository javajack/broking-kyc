-- Remove auto-generated IDs from headings (section tags already provide anchors)
function Header(el)
  el.identifier = ""
  return el
end
