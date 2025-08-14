import { Controller } from "@hotwired/stimulus";

import { getSessionStorage } from "../services/storage_service";

class AppController extends Controller {

  async connect() {
    const token = await getSessionStorage('token');

    const target = token ? "/frames/entries.html" : "/frames/signin.html";
    Turbo.visit(target, { frame: "app" });
  }
}

export default AppController;