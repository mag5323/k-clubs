$(document).ready(function(){
    var network;
    var targetNodes = [];
    var constellationTime = 0;

    $('#submit').click(function(){
        var node = parseInt(document.getElementById('nodeCount').value);

        if (node > 20) {
            alert(" Too big!");
            return false;
        }

        network = draw(node);
    });

    $('#constellation').click(function(){
        constellation(network);
    });

    function draw(nodeNum) {
        var nodes = [];
        var edges = [];

        for (var i = 1; i <= nodeNum; i++) {
            nodes.push({
                id: i,
                label: String(i)
            });

            for (var j = i+1; j <= nodeNum; j++) {
                if (Math.random() < 0.5) {
                    edges.push({
                        from: i,
                        to: j
                    });
                }
            }
        }

        // create a network
        var container = document.getElementById('mynetwork');
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {};
        return new vis.Network(container, data, options);
    }

    function constellation(network) {
        var maxDegree = 0;
        var maxKey = 0;
        var nodePool = network.nodes;

        for (keys in nodePool) {
            if (network.nodes[keys].selected) {
                continue;
            }

            var degree = network.nodes[keys].edges.length;
            if (degree > maxDegree) {
                maxDegree = degree;
                maxKey = keys;
            }
        }

        targetNodes.push(maxKey);
        network.selectNodes(targetNodes);
        constellationTime += 1;
    }
});
