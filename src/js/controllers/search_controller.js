import { Controller } from "@hotwired/stimulus";

class SearchController extends Controller {
    static targets = ["input", "item", "clearButton"];

    search() {
        const searchTerm = this.inputTarget.value.trim().toLowerCase();

        if (!searchTerm.length) {
            this.showItems();
            return;
        }

        this.itemTargets.forEach(item => {
            item.hidden = !item.textContent.trim().toLowerCase().includes(searchTerm);
        });

        const visibleItems = this.itemTargets.filter(item => !item.hidden);

        if (visibleItems.length === 1) {
            visibleItems[0].click();
        }
    }

    showItems() {
        this.itemTargets.forEach(item => item.hidden = false);
    }

    toggleClearButton(event) {
       if (event) {
           this.clearButtonTarget.hidden = false
       } else {
           this.clearButtonTarget.hidden = true;
       }
    }

    clearSearch() {
        this.inputTarget.value = "";
        this.clearButtonTarget.hidden = true;
        this.showItems();
    }
}

export default SearchController;
