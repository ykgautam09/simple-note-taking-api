const axios = require("axios");
const { request } = require("express");
describe("Integration test running...", () => {
  describe("POST API /notes", () => {
    it("Creates a new note", async () => {
      // create test data
      const response = await axios.post("http://localhost:3000/notes", {
        title: "test note title",
        body: "test note body"
      });

      expect(response.status).toBe(201);
      expect(response.data.status).toEqual("CREATED");
      expect(response.data.data).toBeInstanceOf(Array);
    });
  });

  describe("GET API /notes/:id", () => {
    it("Fetch a note by ID", async () => {
      let id = 2; // data 1-3 entries are entered before test
      // fetch note by ID
      const response = await axios.get(`http://localhost:3000/notes/${id}`);

      expect(response.status).toBe(200);
      expect(response.data.status).toEqual("SUCCESS");
      expect(response.data.data).toBeInstanceOf(Array);
      if (response.data.data > 0)
        expect(response.data.data[0].title).toBeInstanceOf(String);
    });
  });

  describe("GET API /notes/", () => {
    it("search a new note by title", async () => {
      let title = "test"; // data 1-3 entries are entered before test
      // search note by title
      const response = await axios.get(`http://localhost:3000/notes`, {
        params: { title }
      });

      expect(response.status).toBe(200);
      expect(response.data.status).toEqual("SUCCESS");
      expect(response.data.data).toBeInstanceOf(Array);
      if (response.data.data > 0)
        expect(response.data.data.title).toBeInstanceOf(String);
    });
  });

  describe("PUT API /notes/:id", () => {
    it("Update a note by id", async () => {
      let id = 2; // data 1-3 entries are entered before test
      // update note by ID
      const response = await axios.put(`http://localhost:3000/notes/${id}`, {
        title: "updated note title",
        body: "updated note body"
      });

      expect(response.status).toBe(200);
      expect(response.data.status).toEqual("SUCCESS");
      expect(response.data.data).toBeInstanceOf(Array);
      if (response.data.data > 0)
        expect(response.data.data[0].title).toBeInstanceOf(String);
    });
  });
});
beforeAll(async () => {
  try {
    const mockNotesArray = [
      { title: "dummy 1", body: "dummy body with some data 1" },
      { title: "dummy 2", body: "dummy body with some data 2" },
      { title: "dummy 3", body: "dummy body with some data 3" }
    ];
    const promiseArr = [];
    for (const note of mockNotesArray) {
      promiseArr.push(axios.post("http://localhost:3000/notes", note));
    }
    await Promise.all(promiseArr);
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
});
