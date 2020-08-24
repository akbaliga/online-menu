const blocks = [
    {
      label: 'Burger',
      categoryId: 'burgers',
      categoryLabel: 'Burgers',
      tags: [ 'burger', 'lettuce', 'tomato' ]
    }, {
      label: 'Cheese Burger',
      categoryId: 'burgers',
      categoryLabel: 'Burgers',
      tags: [ 'cheese', 'burger', 'lettuce', 'tomato' ]
    }, {
      label: 'Veggie Burger',
      categoryId: 'burgers',
      categoryLabel: 'Burgers',
      tags: [ 'vegetable', 'burger', 'lettuce', 'tomato' ]
    }, {
      label: 'Fancy Burger',
      categoryId: 'burgers',
      categoryLabel: 'Burgers',
      tags: [ 'cheese', 'burger', 'lettuce', 'tomato', 'fancy sauce' ]
    }, {
      label: 'Cheese Fries',
      categoryId: 'fries',
      categoryLabel: 'Fries',
      tags: [ 'fries', 'cheese', 'potato', 'fried' ]
    }, {
      label: 'Shake',
      categoryId: 'dessert',
      categoryLabel: 'Dessert',
      tags: [ 'shake', 'milk', 'chocolate', 'strawberry', 'frozen', 'dessert', 'sweet' ]
    }, {
      label: 'Tots',
      categoryId: 'fries',
      categoryLabel: 'Fries',
      tags: [ 'fries', 'potato', 'fried', 'tater' ]
    }, {
      label: 'Kombucha',
      categoryId: 'drinks',
      categoryLabel: 'Drinks',
      tags: [ 'fermented', 'draft' ]
    }, {
      label: 'Hot Dog',
      categoryId: 'dog',
      categoryLabel: 'Hot Dogs',
      tags: [ 'relish', 'onion', 'cheese sauce', 'chopped bacon' ]
    }, {
      label: 'Fries',
      categoryId: 'fries',
      categoryLabel: 'Fries',
      tags: [ 'fries', 'cheese', 'potato', 'fried' ]
    }, {
      label: 'Tee Shirt',
      categoryId: 'merchandise',
      categoryLabel: 'Merchandise',
      tags: [ 'apparel' ]
    }
  ];


  const blockContainer = document.getElementById('block-menu');
  const searchBox = document.getElementById('search');

  function renderBlock(block) {
    const blockEl = document.createElement('div');
    const icon = document.createElement('i');
    icon.classList.add('fa-hamburger');
    icon.classList.add('fas');
    const title = document.createElement('p');

    title.textContent = block.label;
    blockEl.appendChild(icon);
    blockEl.appendChild(title);
    blockEl.className = 'menu-item';

    return blockEl;
  }



  function buildObjectMap(array) {
      return array.reduce((obj, value) => {
        if ( obj[value.categoryId] ) {
          obj[value.categoryId].push(value);
        } else {
          obj[value.categoryId] = [Object.assign({}, value)];
        }
        return obj;
    }, {});
  }

  function buildBlock(categoryMap) {
    for (category in categoryMap) {
        const header = document.createElement('h1');
        const lineBreak = document.createElement('hr');
        const categorySection = document.createElement('section');
        const menuItemsSection = document.createElement('div');
        categorySection.className = category;
    
        header.textContent = category && category.toString().toUpperCase();
        categorySection.appendChild(header);
        
        categoryMap[category].forEach(item =>  menuItemsSection.appendChild(renderBlock(item)));

        categorySection.appendChild(menuItemsSection);
        categorySection.appendChild(lineBreak);
        blockContainer.appendChild(categorySection);
        
    }
  }

  const groupByCategory = buildObjectMap(blocks);
  buildBlock(groupByCategory);

  function searchCategory(event) {
    const searchKey = event && event.target && event.target.value;
    const filteredResults = [];

      blocks.forEach(block => {
          if (block.label.match(searchKey) || block.categoryLabel.match(searchKey) || block.tags.some(tag => tag.match(searchKey))) {
              filteredResults.push(block);
          }
      });

      const filteredObjectMap = buildObjectMap(filteredResults);

      removeAllChildNodes(blockContainer);
      buildBlock(filteredObjectMap);
  }



  function removeAllChildNodes(parent) {
      while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
      }
  }

  searchBox.addEventListener('input', searchCategory);