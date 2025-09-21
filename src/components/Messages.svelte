<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { Grid, h, Row } from "gridjs";
    import "gridjs/dist/theme/mermaid.css";
    import { Authentication } from "../clients/Authentication";
    import { BrowserStorage } from "../clients/BrowserStorage";
    import { Database } from "../clients/Database";

    let grid;
    let items;

    onMount(async () => {
        grid = new Grid({
            sort: true,
            pagination: false,
            fixedHeader: true,
            search: {
                enabled: true,
                ignoreHiddenColumns: false,
                selector: (cell, rowIndex, cellIndex) => cellIndex === 3 ? new Date(cell).toISOString() : cell
            },
            columns: [
                {
                    id: "id",
                    hidden: true
                },
                {
                    id: "sourceName",
                    name: "From"
                },
                {
                    id: "destination",
                    name: "Alias",
                    hidden: true
                },
                {
                    id: "subject",
                    name: "Subject"
                },
                {
                    id: "sent",
                    name: "Received",
                    formatter: (cell) => new Date(cell).toLocaleString(),
                    sort: {
                        enabled: true,
                        compare: (a, b) => {
                            const dateA = Date.parse(a);
                            const dateB = Date.parse(b);
                            
                            if(dateA > dateB) return 1;
                            if(dateB > dateA) return -1;
                            return 0;
                        }
                    }
                },
                {
                    id: "actions",
                    name: "Actions",
                    formatter: (cell, row, column) => {
                        return [
                            h("button", { onClick: () => navigate(`/message/${row.cells[0].data}`) }, "Details"),
                            h("button", { onClick: () => navigate(`/download/${row.cells[0].data}`) }, "Download"),
                        ];
                    }
                }
            ],
            data: async () => await loadMessages()
        }).render(document.getElementById("messages"));
    });

    const loadMessages = async () => {
        try {
            const creds = await Authentication.AwsCredentials();
            const settings = BrowserStorage.getSettings();
            const database = new Database(creds, settings.tableName, settings.region);
            items = await database.tableItems();
            return items;
        } catch(err) {
            console.error(`Failed to load messages from ${settings.tableName}: ${err}`);
            return []; // grid expects an array; return empty on failure
        }
    }
</script>

<div id="messages"></div>

<style global>
    @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
</style>