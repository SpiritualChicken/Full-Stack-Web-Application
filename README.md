**Marvel Character Search Website**

This is a simple web application that allows users to search for Marvel characters and view a list of characters in an index. It leverages the Marvel API to fetch data about Marvel characters.

**Features**
- Search for Marvel characters by name.
- View an index of 20 random Marvel characters.
- Filter for a list of the Avengers heros.

**Usage**

Searching for Marvel Heros :
- On the home page, enter the name of the Marvel character you want to search for in the search bar.
- Click the "Search" button or press "Enter."
- The search results will be displayed on the same page, showing the matching characters.
- This feature uses the "click" event type.

Auto-complete: 
- On the home page, enter the name of the Marvel character you want to search for in the search bar.
- As you type, the autocomplete dropdown will display character suggestions that match your input.
- You can click on a suggestion to select it, or you can continue typing and narrow down your search.
- Press "Enter" or select a suggestion to initiate the search.
- This feature uses the "keyup" event type.

Hero Index:
- Scroll down the webpage and by default, 20 random Marvel characters will be generated.

Avengers Filter: 
- Select "Avengers" from the dropdown button (HTML "select" element).
- The index should then change and display a list of 10 Avengers.
- This feature uses the "change" event type.

