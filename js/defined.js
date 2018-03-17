$('#submit').click(function() {

	

		var user=$('#usid').val()
		var url='https://api.github.com/users/'+user;
		var followers='https://api.github.com/users/'+user+'/followers';
		var following='https://api.github.com/users/'+user+'/following';
		var repo='https://api.github.com/users/'+user+'/repos';

		console.log('button clicked');
		$.ajax({
			type:'get',
			url: url,
			beforeSend: function() {
				console.log('before');
				$("#info").hide("slow");
				$("#prog").show("slow");				
			}
		}).done(function(data) {
			console.log(data);
			$('#img').html("<img src='"+data.avatar_url+"' class='circle'>");
			$('#user').html(data.login);
			///------folowers
			$.ajax({
				type:'get',
				url: repo,
				}).done(function(data) {
						console.log(data);
						var html='';
						if(data.length==0) html="No repo (-.-)";
						else
						for(var i=0;i<data.length;i++){
							html+="<li>"+data[i].name+"</li>\n"
						}
						$('#repo').html(html);
						console.log(html);
						
						$.ajax({
						type:'get',
						url: followers,
						}).done(function(data) {
							console.log(data);
							var html='';
							if(data.length==0) html="No followers (._.)";
							else
							for(var i=0;i<data.length;i++){
								html+="<li>"+data[i].login+"</li>\n"
							}
							$('#Followers').html(html);
							console.log(html);
							//--------folowing
							$.ajax({
								type:'get',
								url: following,
							}).done(function(data) {
								console.log(data);
								var html='';
								if(data.length==0) html="No followers (+_+)";
								else
									for(var i=0;i<data.length;i++){
										html+="<li>"+data[i].login+"</li>\n"
									}
								$('#Following').html(html);
								console.log(html);
								$("#prog").hide("slow"); 
								$("#data").show("slow");	
							})
						})
				})
			}).catch(function(err){       
        		$('#prog').html('');
        		$('#err').html('User Not Found');

    			});
	})
